import { Injectable } from '@nestjs/common';

@Injectable()
export class BaseResolver {
  protected wrapSuccess<T>(data?: T) {
    return {
      success: true,
      ...data
    };
  }

  protected wrapFail<T>(reason?: string, data?: T) {
    return {
      success: false,
      reason,
      ...data
    };
  }
}
