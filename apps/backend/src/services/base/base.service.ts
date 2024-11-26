import { DeepPartial, Repository } from 'typeorm';

export class BaseService<T> {
  constructor(private repository: Repository<T>) {}

  async findAll(): Promise<T[]> {
    return await this.repository.find();
  }

  async findOne(...params: Parameters<typeof this.repository.findOne>) {
    return await this.repository.findOne(...params);
  }

  async create(data: DeepPartial<T>) {
    return await this.repository.save(data);
  }

  async update(...params: Parameters<typeof this.repository.update>) {
    return await this.repository.update(...params);
  }

  async delete(...params: Parameters<typeof this.repository.delete>) {
    return await this.repository.delete(...params);
  }
}
