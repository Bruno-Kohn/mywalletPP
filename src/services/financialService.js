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
