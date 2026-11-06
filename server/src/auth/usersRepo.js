const COLUMNS = "id, name, email, role, created_at";

export class EmailTakenError extends Error {
  constructor() {
    super("Email already registered");
    this.name = "EmailTakenError";
  }
}

export function createUsersRepo(pool) {
  // Runs several statements as one all-or-nothing step.
  const transaction = async (fn) => {
    const client = await pool.connect();
    try {
      await client.query("begin");
      const result = await fn(client);
      await client.query("commit");
      return result;
    } catch (err) {
      await client.query("rollback").catch(() => {});
      throw err;
    } finally {
      client.release();
    }
  };

  return {
    async findByEmail(email) {
      const r = await pool.query(`select ${COLUMNS}, password_hash from users where lower(email) = lower($1)`, [email]);
      return r.rows[0] ?? null;
    },

    async findById(id) {
      const r = await pool.query(`select ${COLUMNS} from users where id = $1`, [id]);
      return r.rows[0] ?? null;
    },

    async findByOAuth(provider, providerUserId) {
      const r = await pool.query(
        `select ${COLUMNS.split(", ").map((c) => `u.${c}`).join(", ")}
           from oauth_identities o join users u on u.id = o.user_id
          where o.provider = $1 and o.provider_user_id = $2`,
        [provider, providerUserId],
      );
      return r.rows[0] ?? null;
    },

    // A brand-new account made through Google or GitHub (no password).
    async createOAuthUser({ name, email, provider, providerUserId }) {
      try {
        return await transaction(async (c) => {
          const u = await c.query(`insert into users (name, email, password_hash) values ($1, $2, null) returning ${COLUMNS}`, [name, email]);
          await c.query("insert into oauth_identities (provider, provider_user_id, user_id, email) values ($1, $2, $3, $4)", [provider, providerUserId, u.rows[0].id, email]);
          return u.rows[0];
        });
      } catch (err) {
        if (err.code === "23505") throw new EmailTakenError();
        throw err;
      }
    },

    // Connect a provider to an existing account. clearPassword removes the old password in the same step.
    async linkOAuth({ userId, provider, providerUserId, email, clearPassword = false }) {
      await transaction(async (c) => {
        await c.query(
          "insert into oauth_identities (provider, provider_user_id, user_id, email) values ($1, $2, $3, $4) on conflict do nothing",
          [provider, providerUserId, userId, email],
        );
        if (clearPassword) await c.query("update users set password_hash = null where id = $1", [userId]);
      });
    },

    async create({ name, email, passwordHash }) {
      try {
        const r = await pool.query(
          `insert into users (name, email, password_hash) values ($1, $2, $3) returning ${COLUMNS}`,
          [name, email, passwordHash],
        );
        return r.rows[0];
      } catch (err) {
        if (err.code === "23505") throw new EmailTakenError();
        throw err;
      }
    },
  };
}
