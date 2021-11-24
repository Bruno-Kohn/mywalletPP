import connection from '../database';

export async function selectUserEmail({ email }) {
  const existingUserWithGivenEmail = await connection.query(
    `SELECT * FROM "users" WHERE "email"=$1`,
    [email]
  );

  return existingUserWithGivenEmail.rows[0];
}

export async function registerUser({ name, email, hashedPassword }) {
  await connection.query(
    `INSERT INTO "users" ("name", "email", "password") VALUES ($1, $2, $3)`,
    [name, email, hashedPassword]
  );
}
