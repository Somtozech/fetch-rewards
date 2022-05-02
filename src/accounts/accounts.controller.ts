import { Body, Controller, Post } from '@nestjs/common';
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
}
