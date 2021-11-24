import connection from '../database.js';
import jwt from 'jsonwebtoken';
import * as financialService from '../services/financialService.js';
import * as financeRepository from '../repositories/financialRepository.js';

export async function registerFinance(req, res) {
  try {
    const user = await financialService.authenticate(req);
    if (!user) return res.sendStatus(401);
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

export async function checkFinance(req, res) {
  try {
    const user = await financialService.authenticate(req);
    if (!user) return res.sendStatus(401);

    const events = await connection.query(
      `SELECT * FROM "financialEvents" WHERE "userId"=$1 ORDER BY "id" DESC`,
      [user.id]
    );

    res.send(events.rows);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
}

export async function sumFinance(req, res) {
  try {
    const user = await financialService.authenticate(req);
    if (!user) return res.sendStatus(401);

    const events = await financeRepository.selectAllUserFinance({ user });

    const sum = events.rows.reduce(
      (total, event) =>
        event.type === 'INCOME' ? total + event.value : total - event.value,
      0
    );

    res.send({ sum });
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
}
