import { Account, AccountSchema } from 'src/models/account';
import accountRepository from 'src/repositories/account';
import accountValidator from 'src/validators/schemas/account';

import CRUDController from '..';

const accountController = new CRUDController<Account>(accountValidator, 'Account', AccountSchema);

accountController.setRepository = accountRepository;

export const createAccountHandler = accountController.create();

export const updateAccountHandler = accountController.update();

export const getAccountHandler = accountController.getById();

export const getAccountsHandler = accountController.scanByTenantId();

export const deleteAccountHandler = accountController.delete();
