export function createJobRunner({ repo, handlers, concurrency = 1, maxAttempts = 3, backoffMs = 2000, logger = console }) {
  let active = 0;
  const queue = [];

  function schedule(id) {
    queue.push(id);
    pump();
  }

  function pump() {
    while (active < concurrency && queue.length) {
      const id = queue.shift();
      active++;
      run(id)
        .catch((err) => logger.error("job runner error:", err?.message ?? err))
        .finally(() => {
          active--;
          pump();
        });
    }
  }

  async function run(id) {
    const queued = await repo.get(id);
    if (!queued || queued.status !== "queued") return;
    const handler = handlers[queued.type];
    if (!handler) return void (await repo.markFailed(id, { code: "unknown_job_type", message: `No handler for ${queued.type}` }));
    const job = await repo.markRunning(id);
    try {
      const result = await handler(job.params, { jobId: id, userId: job.created_by });
      await repo.markSucceeded(id, result);
    } catch (err) {
      if (err?.retryable && job.attempts < maxAttempts) {
        await repo.requeue(id);
        setTimeout(() => schedule(id), backoffMs * 2 ** (job.attempts - 1)).unref?.();
      } else {
        await repo.markFailed(id, { code: err?.code ?? "job_failed", message: err?.message ?? String(err) });
      }
    }
  }

  return {
    async enqueue(type, params, userId) {
      if (!handlers[type]) throw new Error(`Unknown job type: ${type}`);
      const job = await repo.create({ type, params, userId });
      schedule(job.id);
      return job;
    },
    async recover() {
      await repo.recoverInterrupted();
      for (const j of await repo.listQueued()) schedule(j.id);
    },
    idle: () => active === 0 && queue.length === 0,
  };
}
