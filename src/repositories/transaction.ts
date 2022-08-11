import { CategoryType } from 'src/models/category';
import { TransactionSchema, Transaction } from 'src/models/transaction';

import CRUDRepository from '.';

export interface TransactionRequest {
  id: string;
  accountId: string;
  comment?: string;
  date: string;
  tag?: string;
  categoryId: string;
  type: CategoryType;
  cleared: boolean;
  amount: number;
  tenantId: string;
}

export default new CRUDRepository<Transaction>('Transaction', TransactionSchema);
