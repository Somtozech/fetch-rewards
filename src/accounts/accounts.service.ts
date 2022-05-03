import { Injectable } from '@nestjs/common';
import { Transaction } from '../interfaces/transaction.interface';
import { AddTransactionDTO } from './dto/add-transaction.dto';
import { randomUUID } from 'crypto';

@Injectable()
export class AccountsService {
  private transactions: Transaction[];
  constructor() {
    this.transactions = [];
  }

  create(transaction: AddTransactionDTO) {
    this.transactions.push({ ...transaction, id: randomUUID() });
  }

  update(id: string, transaction: Transaction) {
    const index = this.transactions.findIndex((t) => t.id === id);
    this.transactions[index] = transaction;
  }

  checkPointsBalance() {
    return this.transactions.reduce(
      (sum = 0, transaction) => (sum += transaction.points),
      0,
    );
  }

  spendPoints(spendPoints) {
    const transactions = this.fetchAll();
    transactions.sort(
      (x, y) =>
        new Date(x.timestamp).getTime() - new Date(y.timestamp).getTime(),
    );

    const spentPointsPerPayer = {};

    for (const transaction of transactions) {
      const { payer, points, id } = transaction;

      if (spendPoints === 0) break;

      // track payer whose points is spent
      if (!spentPointsPerPayer[payer]) {
        spentPointsPerPayer[payer] = 0;
      }

      if (spendPoints > points) {
        // spend all payer's points
        spentPointsPerPayer[payer] -= points;
        spendPoints -= points;

        this.update(id, { ...transaction, points: 0 });
      } else {
        spentPointsPerPayer[payer] -= spendPoints;
        this.update(id, {
          ...transaction,
          points: points - spendPoints,
        });

        spendPoints = 0;
      }
    }

    return spentPointsPerPayer;
  }

  fetchAll(): Transaction[] {
    return [...this.transactions];
  }

  getBalances() {
    const pointBalances = this.transactions.reduce((result, transaction) => {
      if (!result[transaction.payer]) {
        result[transaction.payer] = 0;
      }
      result[transaction.payer] += transaction.points;
      return result;
    }, {});

    return pointBalances;
  }
}
