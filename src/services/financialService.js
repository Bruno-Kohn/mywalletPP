import jwt from 'jsonwebtoken';
import * as financialRepository from '../repositories/financialRepository.js';

export async function registerFinance({ user, value, type }) {
  if (!['INCOME', 'OUTCOME'].includes(type)) {
    return false;
  }

  if (value < 0) {
    return false;
  }

  await financialRepository.registerFinance({ user, value, type });
  return true;
}

export async function authenticate(req) {
  const authorization = req.headers.authorization || '';
  const token = authorization.split('Bearer ')[1];

  if (!token) {
    return false;
  }

  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    console.log(error);
    return false;
  }
}
