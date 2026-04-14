const { describe, beforeEach, test, expect } = require('@jest/globals');

let BaseRepository;

describe('BaseRepository', () => {
  let model;
  let repository;

  beforeAll(async () => {
    ({ BaseRepository } = await import('../repositories/base.repository.js'));
  });

  beforeEach(() => {
    model = {
      create: jest.fn().mockResolvedValue('created'),
      findById: jest.fn().mockResolvedValue('found-by-id'),
      find: jest.fn().mockResolvedValue(['found-all']),
      findByIdAndDelete: jest.fn().mockResolvedValue('deleted'),
    };

    repository = new BaseRepository(model);
  });

  test('create calls model.create with provided data', async () => {
    const result = await repository.create({ name: 'test' });
    expect(model.create).toHaveBeenCalledWith({ name: 'test' });
    expect(result).toBe('created');
  });

  test('findById calls model.findById with the given id', async () => {
    const result = await repository.findById('123');
    expect(model.findById).toHaveBeenCalledWith('123');
    expect(result).toBe('found-by-id');
  });

  test('findAll calls model.find', async () => {
    const result = await repository.findAll();
    expect(model.find).toHaveBeenCalled();
    expect(result).toEqual(['found-all']);
  });

  test('delete calls model.findByIdAndDelete with the given id', async () => {
    const result = await repository.delete('123');
    expect(model.findByIdAndDelete).toHaveBeenCalledWith('123');
    expect(result).toBe('deleted');
  });
});
