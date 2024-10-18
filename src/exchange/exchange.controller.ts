import { ExchangePayload, ExchangeService } from './exchange.service';
import { Body, Controller, Get, Post, UsePipes } from '@nestjs/common';
import { JoiValidationPipe } from '../validator/validator';
import * as Joi from 'joi';

@Controller('exchange')
export class ExchangeController {
  constructor(private exchangeService: ExchangeService) {}
  @Get('eur/pln')
  getEURToPLNExchangeRate() {
    return this.exchangeService.getEURToPLNExchangeRate();
  }

  @Post('exchange')
  @UsePipes(
    new JoiValidationPipe(
      Joi.object({
        from: Joi.string().required().valid('eur'),
        to: Joi.string().required().valid('pln'),
        amount: Joi.number().required().positive(),
      }),
    ),
  )
  postExchangeTransaction(@Body() body: ExchangePayload) {
    return this.exchangeService.postExchangeTransaction(body);
  }
}
