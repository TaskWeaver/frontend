import {UserRepository} from '../infrastructures';

export default class UserService {
  private readonly userRepo: UserRepository;

  constructor(userRepo: UserRepository) {
    this.userRepo = userRepo;
  }

  async getProfile() {
    return await this.userRepo.getUserProfile();
  }
}
