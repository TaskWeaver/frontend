import AccountRepository from '../infrastructures/AccountRepository.ts';
import axios from 'axios';

export default class AccountService {
  private readonly accountRepo: AccountRepository;

  constructor(accountRepo: AccountRepository) {
    this.accountRepo = accountRepo;
  }

  async createAccount(
    email: string,
    password: string,
    nickname: string,
    imageUrl: string
  ) {
    return await this.accountRepo.createAccount(
      email,
      password,
      nickname,
      imageUrl
    );
  }

  async login(email: string, password: string, deviceId: string) {
    return await this.accountRepo.loginAccount(email, password, deviceId);
  }
}
