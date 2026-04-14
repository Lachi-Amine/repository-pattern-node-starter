const { describe, beforeAll, beforeEach, test, expect } = require('@jest/globals');

jest.unstable_mockModule('../repositories/user.repository.js', () => ({
  userRepository: {
    findByEmail: jest.fn(),
    createUser: jest.fn(),
  },
}));

jest.unstable_mockModule('bcrypt', () => ({
  default: {
    compare: jest.fn(),
    hash: jest.fn(),
  },
}));

let authService;
let userRepository;
let bcrypt;

describe('authService', () => {
  beforeAll(async () => {
    ({ authService } = await import('../services/auth.service.js'));
    ({ userRepository } = await import('../repositories/user.repository.js'));
    const bcryptModule = await import('bcrypt');
    bcrypt = bcryptModule.default;
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('signin returns user when credentials are valid', async () => {
    userRepository.findByEmail.mockResolvedValue({ id: '1', password: 'secret' });
    bcrypt.compare.mockResolvedValue(true);

    const result = await authService.signin('user@test.com', 'password');

    expect(userRepository.findByEmail).toHaveBeenCalledWith('user@test.com');
    expect(bcrypt.compare).toHaveBeenCalledWith('password', 'secret');
    expect(result).toEqual({ id: '1', password: 'secret' });
  });

  test('signin returns null when the user does not exist', async () => {
    userRepository.findByEmail.mockResolvedValue(null);

    const result = await authService.signin('missing@test.com', 'password');

    expect(result).toBeNull();
  });

  test('signup throws when email already exists', async () => {
    userRepository.findByEmail.mockResolvedValue({ id: '1' });

    await expect(
      authService.signup({ name: 'New User', email: 'user@test.com', password: 'password' })
    ).rejects.toThrow('User already exists');
  });

  test('signup hashes password and creates a new user when email is available', async () => {
    userRepository.findByEmail.mockResolvedValue(null);
    bcrypt.hash.mockResolvedValue('hashed-password');
    userRepository.createUser.mockResolvedValue({ id: '1', name: 'New User', email: 'user@test.com', password: 'hashed-password' });

    const result = await authService.signup({ name: 'New User', email: 'user@test.com', password: 'password' });

    expect(bcrypt.hash).toHaveBeenCalledWith('password', 10);
    expect(userRepository.createUser).toHaveBeenCalledWith({
      name: 'New User',
      email: 'user@test.com',
      password: 'hashed-password',
    });
    expect(result).toEqual({ id: '1', name: 'New User', email: 'user@test.com', password: 'hashed-password' });
  });
});
