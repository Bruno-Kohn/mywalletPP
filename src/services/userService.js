import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import * as userRepository from '../repositories/userRepository.js';

export async function signUp({ name, email, password }) {
  const existingUserWithGivenEmail = await userRepository.selectUserEmail({
    email,
  });

  if (existingUserWithGivenEmail) {
    return false;
  }

  const hashedPassword = bcrypt.hashSync(password, 12);
  await userRepository.registerUser({ name, email, hashedPassword });
  return true;
}

export async function signIn({ email, password }) {
  const user = await userRepository.selectUserEmail({ email });

  if (!user || !bcrypt.compareSync(password, user.password)) {
    return null;
  }

  const token = jwt.sign(
    {
      id: user.id,
    },
    process.env.JWT_SECRET
  );
  return token;
}
