import { SavingGoal, SavingGoalSchema } from 'src/models/goal';

import CRUDRepository from '.';

export interface SavingGoalRequest {
  id: string;
  goal: string;
  location: string;
  amount: number;
  tenantId: string;
  icon?: string;
  color?: string;
  image?: string;
}

export default new CRUDRepository<SavingGoal>('SavingGoal', SavingGoalSchema);
