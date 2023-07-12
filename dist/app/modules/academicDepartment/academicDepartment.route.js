'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.academicDepartmentRoutes = void 0;
const express_1 = __importDefault(require('express'));
const validateRequest_1 = __importDefault(
  require('../../middleware/validateRequest')
);
const academicDepartment_controller_1 = require('./academicDepartment.controller');
const academicDepartment_validation_1 = require('./academicDepartment.validation');
const router = express_1.default.Router();
router.post(
  '/create-department',
  (0, validateRequest_1.default)(
    academicDepartment_validation_1.academicFacultyValidation
      .createDepartmentZodSchema
  ),
  academicDepartment_controller_1.AcademicFacultyController
    .createAcademicDepartment
);
router.get(
  '/all-departments',
  academicDepartment_controller_1.AcademicFacultyController
    .getAllAcademicDepartments
);
router.patch(
  '/update/:id',
  (0, validateRequest_1.default)(
    academicDepartment_validation_1.academicFacultyValidation
      .updateDepartmentZodSchema
  ),
  academicDepartment_controller_1.AcademicFacultyController
    .updateAcademicDepartment
);
router.get(
  '/:id',
  academicDepartment_controller_1.AcademicFacultyController
    .getSingleAcademicDepartment
);
router.delete(
  '/delete/:id',
  academicDepartment_controller_1.AcademicFacultyController
    .deleteAcademicDepartments
);
exports.academicDepartmentRoutes = router;
