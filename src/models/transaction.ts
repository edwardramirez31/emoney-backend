import { Document } from 'dynamoose/dist/Document';
import * as dynamoose from 'dynamoose';

import { CategoryType } from './category';

export class Transaction extends Document {
  id = '';
  accountId = '';
  comment = '';
  date = '';
  tag = '';
  categoryId = '';
  type = CategoryType.EXPENSE;
  cleared = false;
  amount = 0;
  tenantId = '';
}

export const TransactionSchema = new dynamoose.Schema(
  {
    id: {
      type: String,
      hashKey: true,
      required: true
    },
    accountId: {
      type: String,
      required: true
    },
    categoryId: {
      type: String,
      required: true
    },
    comment: {
      type: String,
      required: false
    },
    tag: {
      type: String,
      required: false
    },
    date: {
      type: Date,
      required: true
    },
    amount: {
      type: Number,
      required: true,
      default: 0
    },
    cleared: {
      type: Boolean,
      required: false,
      default: true
    },
    type: {
      type: Number,
      enum: [1, 2],
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
