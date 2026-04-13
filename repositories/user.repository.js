import User from "../models/user.js";

export const userRepository = {
  async findByEmail(email) {
    return User.findOne({ email }).lean();
  },

  async findById(id) {
    return User.findById(id).lean();
  },

  async createUser(data) {
    return User.create(data);
  },
};

