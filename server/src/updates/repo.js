export class RunInProgressError extends Error {
  constructor() {
    super("An update run is already in progress.");
    this.name = "RunInProgressError";
  }
}

const PUBLIC = "id, trigger, status, started_at, finished_at, regions_checked, new_acquisitions, captions_created, failed_tasks, created_by";
const FULL = `${PUBLIC}, summary`;

export function createUpdateRunsRepo(pool) {
  const one = async (sql, p) => (await pool.query(sql, p)).rows[0] ?? null;
  return {
    async start({ trigger, userId }) {
      try {
        return await one(`insert into update_runs (trigger, created_by) values ($1, $2) returning ${FULL}`, [trigger, userId ?? null]);
      } catch (err) {
        if (err.code === "23505") throw new RunInProgressError();
        throw err;
      }
    },
    get: (id) => one(`select ${FULL} from update_runs where id = $1`, [id]),
    finish: (id, { status, regions_checked, new_acquisitions, captions_created, failed_tasks, summary }) =>
      one(
        `update update_runs set status = $2, finished_at = now(), regions_checked = $3, new_acquisitions = $4, captions_created = $5, failed_tasks = $6, summary = $7::jsonb
          where id = $1 returning ${FULL}`,
        [id, status, regions_checked, new_acquisitions, captions_created, failed_tasks, JSON.stringify(summary ?? {})],
      ),
    running: () => one(`select ${PUBLIC} from update_runs where status = 'running' limit 1`),
    latest: () => one(`select ${PUBLIC} from update_runs order by started_at desc, id desc limit 1`),
    lastSuccess: () => one(`select ${PUBLIC} from update_runs where status = 'succeeded' order by finished_at desc limit 1`),
    async list({ limit, after = null }) {
      return (
        await pool.query(
          `select ${PUBLIC}, started_at::text as started_at_raw from update_runs
            where ($1::timestamptz is null or (started_at, id) < ($1::timestamptz, $2::uuid))
            order by started_at desc, id desc limit $3`,
          [after?.t ?? null, after?.id ?? null, limit],
        )
      ).rows;
    },
    async recoverInterrupted() {
      await pool.query(`update update_runs set status = 'failed', finished_at = now(), summary = '{"error":"The server restarted while this run was in progress."}'::jsonb where status = 'running'`);
    },
  };
}
