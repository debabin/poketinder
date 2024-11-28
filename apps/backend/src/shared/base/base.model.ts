import { ApiProperty } from '@nestjs/swagger';

export class BaseResponse {
  @ApiProperty({ description: 'Статус запроса' })
  success!: boolean;

  @ApiProperty({ description: 'Причина ошибки', nullable: true, required: false })
  reason?: string;
}
