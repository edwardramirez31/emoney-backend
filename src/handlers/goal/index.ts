import savingGoalValidator from 'src/validators/schemas/goal';
import { SavingGoal, SavingGoalSchema } from 'src/models/goal';

import CRUDController from '..';

const SavingGoalController = new CRUDController<SavingGoal>(savingGoalValidator, 'SavingGoal', SavingGoalSchema);

export const createSavingGoalHandler = SavingGoalController.create();

export const updateSavingGoalHandler = SavingGoalController.update();

export const getSavingGoalHandler = SavingGoalController.getById();

export const getSavingGoalsHandler = SavingGoalController.scanByTenantId();

export const deleteSavingGoalHandler = SavingGoalController.delete();
