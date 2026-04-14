export class BaseRepository {
  constructor(model) {
    this.model = model;
  }

  async create(data) {
    return this.model.create(data);
  }

  async findById(id) {
    return this.model.findById(id);
  }

  async findAll() {
    return this.model.find();
  }

  async delete(id) {
    return this.model.findByIdAndDelete(id);
  }
}