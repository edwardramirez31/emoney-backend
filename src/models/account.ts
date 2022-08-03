import { Document } from 'dynamoose/dist/Document';
import * as dynamoose from 'dynamoose';

export class Account extends Document {
  id = '';
  name = '';
  tenantId = '';
  cleared = 0;
  balance = 0;
  goal = 0;
  icon = '';
  color = '';
}

export const AccountSchema = new dynamoose.Schema(
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
    cleared: {
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
    },
    icon: {
      type: String,
      required: true
    },
    color: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true
  }
);
