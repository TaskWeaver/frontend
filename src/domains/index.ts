import {AccountService} from './applications';
import {AccountRepository} from './infrastructures';

const accountRepository = new AccountRepository();

const service = {
  account: new AccountService(accountRepository),
};

export {service};
