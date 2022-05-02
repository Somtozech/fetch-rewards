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

  fetchAll() {
    return this.transactions;
  }
}
