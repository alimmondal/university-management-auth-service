import express from 'express';
import validateRequest from '../../middleware/validateRequest';
import { AcademicFacultyController } from './academicDepartment.controller';
import { academicFacultyValidation } from './academicDepartment.validation';

const router = express.Router();

router.post(
  '/create-department',
  validateRequest(academicFacultyValidation.createDepartmentZodSchema),
  AcademicFacultyController.createAcademicDepartment
);

router.get(
  '/all-departments',
  AcademicFacultyController.getAllAcademicDepartments
);

router.patch(
  '/update/:id',
  validateRequest(academicFacultyValidation.updateDepartmentZodSchema),
  AcademicFacultyController.updateAcademicDepartment
);

router.get('/:id', AcademicFacultyController.getSingleAcademicDepartment);

router.delete(
  '/delete/:id',
  AcademicFacultyController.deleteAcademicDepartments
);

export const academicDepartmentRoutes = router;
