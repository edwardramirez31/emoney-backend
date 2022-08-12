import transferValidator from 'src/validators/schemas/transfer';
import { Transfer, TransferSchema } from 'src/models/transfer';

import CRUDController from '..';

const transferController = new CRUDController<Transfer>(transferValidator, 'Transfer', TransferSchema);

export const createTransferHandler = transferController.create();

export const updateTransferHandler = transferController.update();

export const getTransferHandler = transferController.getById();

export const getTransfersHandler = transferController.scanByTenantId();

export const deleteTransferHandler = transferController.delete();
