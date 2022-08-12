import transactionValidator from 'src/validators/schemas/transaction';
import { Transaction, TransactionSchema } from 'src/models/transaction';

import CRUDController from '..';

const transactionController = new CRUDController<Transaction>(transactionValidator, 'Transaction', TransactionSchema);

export const createTransactionHandler = transactionController.create();

export const updateTransactionHandler = transactionController.update();

export const getTransactionHandler = transactionController.getById();

export const getTransactionsHandler = transactionController.scanByTenantId();

export const deleteTransactionHandler = transactionController.delete();
