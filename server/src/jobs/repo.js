export function createJobsRepo(pool) {
  const one = async (sql, params) => (await pool.query(sql, params)).rows[0] ?? null;
  return {
    create: ({ type, params, userId }) => one("insert into jobs (type, params, created_by) values ($1, $2::jsonb, $3) returning *", [type, JSON.stringify(params), userId ?? null]),
    get: (id) => one("select * from jobs where id = $1", [id]),
    markRunning: (id) => one("update jobs set status = 'running', attempts = attempts + 1, started_at = now() where id = $1 returning *", [id]),
    markSucceeded: (id, result) => one("update jobs set status = 'succeeded', result = $2::jsonb, error = null, finished_at = now() where id = $1 returning *", [id, JSON.stringify(result ?? {})]),
    markFailed: (id, error) => one("update jobs set status = 'failed', error = $2::jsonb, finished_at = now() where id = $1 returning *", [id, JSON.stringify(error)]),
    requeue: (id) => one("update jobs set status = 'queued' where id = $1 returning *", [id]),
    async recoverInterrupted() {
      await pool.query(`update jobs set status = 'failed', finished_at = now(), error = '{"code":"interrupted","message":"The server restarted while this job was running. Submit it again."}'::jsonb where status = 'running'`);
    },
    async listQueued() {
      return (await pool.query("select id from jobs where status = 'queued' order by created_at")).rows;
    },
  };
}
