import {AccountService, TeamService, UserService} from './applications';
import {
  AccountRepository,
  UserRepository,
  TeamRepository,
} from './infrastructures';

const accountRepository = new AccountRepository();
const userRepository = new UserRepository();
const teamRepository = new TeamRepository();

const service = {
  account: new AccountService(accountRepository),
  user: new UserService(userRepository),
  team: new TeamService(teamRepository),
};

export {service};
