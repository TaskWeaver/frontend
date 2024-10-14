import {AccountService, UserService} from './applications';
import {AccountRepository, UserRepository} from './infrastructures';

const accountRepository = new AccountRepository();
const userRepository = new UserRepository();

const service = {
  account: new AccountService(accountRepository),
  user: new UserService(userRepository),
};

export {service};
