import * as dynamoose from 'dynamoose';

import { DocumentWithTenant } from './types';

export class SavingGoal extends DocumentWithTenant {
  goal = '';
  location = '';
  amount = 0;
  icon = '';
  color = '';
  image = '';
}

export const SavingGoalSchema = new dynamoose.Schema(
  {
    id: {
      type: String,
      hashKey: true,
      required: true
    },
    location: {
      type: String,
      required: true
    },
    goal: {
      type: String,
      required: false
    },
    amount: {
      type: Number,
      required: true,
      default: 0
    },
    tenantId: {
      type: String,
      required: true,
      rangeKey: true
    },
    icon: {
      type: String,
      required: false
    },
    image: {
      type: String,
      required: false
    },
    color: {
      type: String,
      required: false
    }
  },
  {
    timestamps: true
  }
);
