import {UserRepository} from '../infrastructures';

export default class UserService {
  private readonly userRepo: UserRepository;

  constructor(userRepo: UserRepository) {
    this.userRepo = userRepo;
  }

  async getProfile(token: string) {
    return await this.userRepo.getUserProfile(token);
  }

  async getNotification(token: string) {
    return await this.userRepo.getNotification(token);
  }

  async getNewToken(accessToken: string, refreshToken: string) {
    return await this.userRepo.getNewToken(accessToken, refreshToken);
  }
}
