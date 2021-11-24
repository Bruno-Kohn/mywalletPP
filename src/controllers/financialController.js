import jwt from 'jsonwebtoken';
import * as financialService from '../services/financialService.js';

export async function registerFinance(req, res) {
  try {
    const result = authenticate(req, res);
    if (!result) return res.sendStatus(401);
    const { value, type } = req.body;

    if (!value || !type) {
      return res.sendStatus(400);
    }

    const result = await financialService.registerFinance({
      user,
      value,
      type,
    });

    if (result) {
      res.sendStatus(201);
    } else {
      res.sendStatus(400);
    }
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
}

function authenticate(req) {
  const authorization = req.headers.authorization || '';
  const token = authorization.split('Bearer ')[1];

  if (!token) {
    return false;
  }

  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch {
    return false;
  }
}
