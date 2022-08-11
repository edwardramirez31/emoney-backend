import { TransferSchema, Transfer } from 'src/models/transfer';

import CRUDRepository from '.';

export interface TransferRequest {
  id: string;
  comment?: string;
  sender: string;
  receiver: string;
  date: number;
  amount: number;
  tenantId: string;
}

export default new CRUDRepository<Transfer>('Transfer', TransferSchema);
