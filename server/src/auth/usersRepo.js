const COLUMNS = "id, name, email, role, created_at";

export class EmailTakenError extends Error {
  constructor() {
    super("Email already registered");
    this.name = "EmailTakenError";
  }
}

export function createUsersRepo(pool) {
  return {
    async findByEmail(email) {
      const r = await pool.query(`select ${COLUMNS}, password_hash from users where lower(email) = lower($1)`, [email]);
      return r.rows[0] ?? null;
    },

    async findById(id) {
      const r = await pool.query(`select ${COLUMNS} from users where id = $1`, [id]);
      return r.rows[0] ?? null;
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
