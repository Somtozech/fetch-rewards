import { Body, Controller, Get, Post } from '@nestjs/common';
import { AccountsService } from './accounts.service';
import { AddTransactionDTO } from './dto/add-transaction.dto';

@Controller()
export class AccountsController {
  constructor(private readonly accountsService: AccountsService) {}

  @Post('/transactions')
  async addTransaction(@Body() newTransaction: AddTransactionDTO) {
    await this.accountsService.create(newTransaction);

    return { success: true, message: 'Add transaction successful' };
  }

  @Get('/balances')
  async getPointBalances() {
    const transactions = await this.accountsService.fetchAll();

    const pointBalances = transactions.reduce((result, transaction) => {
      if (!result[transaction.payer]) {
        result[transaction.payer] = 0;
      }
      result[transaction.payer] += transaction.points;
      return result;
    }, {});

    return pointBalances;
  }
}
