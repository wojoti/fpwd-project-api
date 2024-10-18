import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ExchangeTransactionSchema } from './exchangeTransaction.model';
import { ExchangeService } from './exchange.service';
import { ExchangeController } from './exchange.controller';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    HttpModule,
    MongooseModule.forFeature([
      { name: 'ExchangeTransaction', schema: ExchangeTransactionSchema },
    ]),
  ],
  providers: [ExchangeService],
  exports: [
    ExchangeService,
    MongooseModule.forFeature([
      { name: 'ExchangeTransaction', schema: ExchangeTransactionSchema },
    ]),
  ],
  controllers: [ExchangeController],
})
export class ExchangeModule {}
