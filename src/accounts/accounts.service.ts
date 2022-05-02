import { Injectable } from '@nestjs/common';
import { AddTransactionDTO } from './dto/add-transaction.dto';

interface Transaction {
  payer: string;
  points: number;
  timestamp: string;
}

@Injectable()
export class AccountsService {
  private transactions: Transaction[];
  constructor() {
    this.transactions = [];
  }
  create(transaction: AddTransactionDTO) {
    this.transactions.push(transaction);
  }
}
