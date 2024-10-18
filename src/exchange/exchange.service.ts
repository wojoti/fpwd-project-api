import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { differenceInSeconds } from 'date-fns';
import { Model } from 'mongoose';
import { firstValueFrom } from 'rxjs';
import { ExchangeTransaction } from './exchangeTransaction.model';

export type ExchangePayload = {
  from: string;
  to: string;
  amount: number;
};

@Injectable()
export class ExchangeService {
  constructor(
    @InjectModel('ExchangeTransaction')
    private exchangeTransactionModel: Model<Document & ExchangeTransaction>,
    private readonly httpService: HttpService,
  ) {
    this.preloadExchangeRates();
  }
  private eurPlnExchangeRate = { exchange_rate: 0, date: '' };

  async fetchExchangeRate() {
    const { data } = await firstValueFrom(
      this.httpService.get(`${process.env.API_URL}`, {
        headers: { 'x-api-key': `${process.env.API_KEY}` },
      }),
    );
    return { ...data, date: new Date() };
  }

  async preloadExchangeRates() {
    this.eurPlnExchangeRate = await this.fetchExchangeRate();
  }

  async verifyExchangeRate() {
    const dateDiff = differenceInSeconds(
      new Date(),
      this.eurPlnExchangeRate?.date,
    );
    if (dateDiff > 60) {
      await this.preloadExchangeRates();
    }
  }

  async getEURToPLNExchangeRate() {
    await this.verifyExchangeRate();
    return this.eurPlnExchangeRate;
  }

  async postExchangeTransaction(body: ExchangePayload) {
    await this.verifyExchangeRate();
    const transaction = new this.exchangeTransactionModel({
      rate: this.eurPlnExchangeRate.exchange_rate,
      from: body.from,
      to: body.to,
      amountFrom: body.amount,
      amountTo: (body.amount * this.eurPlnExchangeRate.exchange_rate).toFixed(
        2,
      ),
    });

    return await transaction.save();
  }
}
