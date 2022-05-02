import { Body, Controller, Get, Post } from '@nestjs/common';
import { AccountsService } from './accounts.service';
import { AddTransactionDTO } from './dto/add-transaction.dto';
import { SpendPointsDTO } from './dto/spend-points.dto';

@Controller()
export class AccountsController {
  constructor(private readonly accountsService: AccountsService) {}

  @Post('/transactions')
  addTransaction(@Body() newTransaction: AddTransactionDTO) {
    this.accountsService.create(newTransaction);

    return { success: true, message: 'Add transaction successful' };
  }

  @Post('/redeem_points')
  spendPoints(@Body() input: SpendPointsDTO) {
    return this.accountsService.spendPoints(input.points);
  }

  @Get('/balances')
  getPointBalances() {
    return this.accountsService.getBalances();
  }
}
