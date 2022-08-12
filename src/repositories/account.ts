import { Model } from 'dynamoose/dist/Model';
import { Account, AccountSchema } from 'src/models/account';
import { CategoryType } from 'src/models/category';

import CRUDRepository from '.';

export interface AccountRequest {
  id: string;
  tenantId: string;
  name: string;
  icon: string;
  color: string;
  cleared?: number;
  balance?: number;
  goal?: number;
}

export interface UpdateOnTransactionCreated {
  id: string;
  tenantId: string;
  amount: number;
  type: CategoryType;
}

export interface UpdateOnTransactionUpdated extends UpdateOnTransactionCreated {
  oldAmount: number;
}

class AccountRepository extends CRUDRepository<Account> {
  private dbInstanceModel: Model;

  constructor() {
    super('Account', AccountSchema);
    this.dbInstanceModel = this.dbInstance;
  }

  updateOnTransactionCreated = async (request: UpdateOnTransactionCreated): Promise<void> => {
    try {
      await this.dbInstanceModel.update(
        {
          id: request.id,
          tenantId: request.tenantId
        },
        {
          $ADD: { balance: request.type === CategoryType.EXPENSE ? -request.amount : request.amount }
        }
      );
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(JSON.stringify(error));
    }
  };

  updateOnTransactionUpdated = async (request: UpdateOnTransactionUpdated): Promise<void> => {
    const amountDifference = request.amount - request.oldAmount;
    try {
      await this.dbInstanceModel.update(
        {
          id: request.id,
          tenantId: request.tenantId
        },
        {
          $ADD: { balance: request.type === CategoryType.EXPENSE ? -amountDifference : amountDifference }
        }
      );
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(JSON.stringify(error));
    }
  };

  updateOnTransactionDeleted = async (request: UpdateOnTransactionCreated): Promise<void> => {
    try {
      await this.dbInstanceModel.update(
        {
          id: request.id,
          tenantId: request.tenantId
        },
        {
          $ADD: { balance: request.type === CategoryType.EXPENSE ? request.amount : -request.amount }
        }
      );
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(JSON.stringify(error));
    }
  };
}

const accountRepository = new AccountRepository();

export default accountRepository;
