import type { Repository } from 'typeorm';

export class BaseService<T> {
  constructor(private repository: Repository<T>) {}

  async findAll(): Promise<T[]> {
    return await this.repository.find();
  }

  async findOne(...params: Parameters<typeof this.repository.findOne>) {
    return await this.repository.findOne(...params);
  }

  async save(...params: Parameters<typeof this.repository.save>) {
    return await this.repository.save(...params);
  }

  async insert(...params: Parameters<typeof this.repository.insert>) {
    return await this.repository.insert(...params);
  }

  async update(...params: Parameters<typeof this.repository.update>) {
    return await this.repository.update(...params);
  }

  async delete(...params: Parameters<typeof this.repository.delete>) {
    return await this.repository.delete(...params);
  }

  async createQueryBuilder(...params: Parameters<typeof this.repository.createQueryBuilder>) {
    return await this.repository.createQueryBuilder(...params);
  }
}
