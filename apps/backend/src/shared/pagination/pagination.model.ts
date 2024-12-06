import { ApiProperty } from '@nestjs/swagger';

export class PaginationResponse {
  @ApiProperty({
    description: 'The current page number (starting from 1)',
    example: 1
  })
  page: number;

  @ApiProperty({
    description: 'The number of items to retrieve per page',
    example: 10
  })
  offset: number;

  @ApiProperty({
    description: 'The total number of items available',
    example: 100
  })
  itemCount: number;

  @ApiProperty({
    description: 'The total number of pages available based on the item count and take',
    example: 10
  })
  pageCount: number;

  @ApiProperty({
    description: 'Indicates if there is a previous page available',
    example: true
  })
  prev: boolean;

  @ApiProperty({
    description: 'Indicates if there is a next page available',
    example: false
  })
  next: boolean;
}
