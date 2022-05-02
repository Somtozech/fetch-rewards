import { Injectable } from '@nestjs/common';
import { Transaction } from '../interfaces/transaction.interface';
import { AddTransactionDTO } from './dto/add-transaction.dto';

@Injectable()
export class AccountsService {
  private transactions: Transaction[];
  constructor() {
    this.transactions = [];
  }

  create(transaction: AddTransactionDTO) {
    this.transactions.push(transaction);
  }

  spendPoints(spendPoints) {
    const transactions = this.fetchAll();
    transactions.sort(
      (x, y) =>
        new Date(x.timestamp).getTime() - new Date(y.timestamp).getTime(),
    );

    const today = new Date().toISOString();
    const spentPointsPerPayer = {};

    for (const { payer, points } of transactions) {
      if (spendPoints === 0) break;

      // track payer whose points is spent
      if (!spentPointsPerPayer[payer]) {
        spentPointsPerPayer[payer] = 0;
      }

      if (spendPoints > points) {
        // spend all payer's points
        spentPointsPerPayer[payer] -= points;
        spendPoints -= points;
      } else {
        spentPointsPerPayer[payer] -= spendPoints;
        spendPoints = 0;
      }
    }

    // add spent points to transactions
    for (const payer of Object.keys(spentPointsPerPayer)) {
      this.create({
        payer,
        points: spentPointsPerPayer[payer],
        timestamp: today,
      });
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
