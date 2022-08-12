import * as dynamoose from 'dynamoose';

import { DocumentWithTenant } from './types';

export enum CategoryType {
  EXPENSE = 1,
  INCOME = 2
}

export class Category extends DocumentWithTenant {
  name = '';
  type = CategoryType.EXPENSE;
  icon = '';
  color = '';
  budget = 0;
}

export const CategorySchema = new dynamoose.Schema(
  {
    id: {
      type: String,
      hashKey: true,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    tenantId: {
      type: String,
      required: true,
      rangeKey: true
    },
    icon: {
      type: String,
      required: true
    },
    type: {
      type: Number,
      enum: [1, 2],
      required: true
    },
    color: {
      type: String,
      required: true
    },
    budget: {
      type: Number,
      required: false,
      default: 0
    },
    balance: {
      type: Number,
      required: false,
      default: 0
    },
    goal: {
      type: Number,
      required: false,
      default: 0
    }
  },
  {
    timestamps: true
  }
);
