import { userRepository } from "../repositories/user.repository.js";
import bcrypt from "bcrypt";
import { AppError, ERROR_TYPES } from "../middlewares/errhandler.js";

export const authService = {
  async signin(email, password) {
    const user = await userRepository.findByEmail(email);

    if (!user) return null;

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) return null;

    return user;
  },

  async signup(dto) {
    const existingUser = await userRepository.findByEmail(dto.email);

    if (existingUser) {
      throw new AppError({
        message: "User already exists",
        statusCode: 409,
        type: ERROR_TYPES.duplicate,
      });
    }

    const hashedPassword = await bcrypt.hash(dto.password, 10);

    const user = await userRepository.createUser({
      name: dto.name,
      email: dto.email,
      password: hashedPassword,
    });

    return user;
  },
};
