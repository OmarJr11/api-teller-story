export type Query = Record<string, any>;

export type Id = string | number;

export interface DatabaseRepository<T> {
  create(data: any, query?: Query): Promise<T>;
  find(query?: Query): Promise<T[]>;
  findOne(id: Id, query?: Query): Promise<T>;
  update(id: Id, data: any, query?: Query): Promise<T>;
  remove(id: Id, query?: Query): Promise<T>;
}