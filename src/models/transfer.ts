import * as dynamoose from 'dynamoose';

import { DocumentWithTenant } from './types';

export class Transfer extends DocumentWithTenant {
  comment = '';
  sender = '';
  receiver = '';
  amount = 0;
  date = 0;
}

export const TransferSchema = new dynamoose.Schema(
  {
    id: {
      type: String,
      hashKey: true,
      required: true
    },
    sender: {
      type: String,
      required: true
    },
    receiver: {
      type: String,
      required: true
    },
    comment: {
      type: String,
      required: false
    },
    amount: {
      type: Number,
      required: true,
      default: 0
    },
    date: {
      type: Date,
      required: true
    },
    tenantId: {
      type: String,
      required: true,
      rangeKey: true
    }
  },
  {
    timestamps: true
  }
);
