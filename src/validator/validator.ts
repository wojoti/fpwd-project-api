import {
  HttpException,
  HttpStatus,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { ObjectSchema } from 'joi';

@Injectable()
export class JoiValidationPipe implements PipeTransform {
  constructor(private schema: ObjectSchema) {}

  public transform(value: unknown): unknown {
    const result = this.schema.validate(value);

    if (result.error) {
      throw new HttpException(
        {
          message: 'Validation failed',
          detail: result.error.message.replace(/"/g, `'`),
          statusCode: HttpStatus.BAD_REQUEST,
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    return result.value;
  }
}
