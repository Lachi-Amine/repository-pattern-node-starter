import User from "../models/user.js";
import { BaseRepository } from "./base.repository.js";
class UserRepository extends BaseRepository {
  constructor() {
    super(User);
  }

  async findByEmail(email) {
    return this.model.findOne({ email });
  }
}

export const userRepository = new UserRepository();
