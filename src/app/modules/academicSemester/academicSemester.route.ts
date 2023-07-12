import express from 'express';
import validateRequest from '../../middleware/validateRequest';
import { semesterController } from './AcademicSemester.controller';
import { SemesterValidation } from './academicSemester.validation';

const router = express.Router();

router.post(
  '/create-semester',
  validateRequest(SemesterValidation.createSemesterZodSchema),
  semesterController.createSemester
);

router.patch(
  '/:id',
  validateRequest(SemesterValidation.updateSemesterZodSchema),
  semesterController.updateSemester
);
router.get('/all-semester', semesterController.getAllSemesters);
router.get('/:id', semesterController.getSingleSemester);
router.delete('/:id', semesterController.deleteSemester);

export const AcademicSemesterRoutes = router;
