import type { Repository } from 'typeorm';

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { BaseService } from '@/shared';

import { Statistic } from './entities';

@Injectable()
export class StatisticService extends BaseService<Statistic> {
  constructor(
    @InjectRepository(Statistic)
    private readonly StatisticRepository: Repository<Statistic>
  ) {
    super(StatisticRepository);
  }
}
