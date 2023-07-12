'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.AcademicSemesterRoutes = void 0;
const express_1 = __importDefault(require('express'));
const validateRequest_1 = __importDefault(
  require('../../middleware/validateRequest')
);
const AcademicSemester_controller_1 = require('./AcademicSemester.controller');
const academicSemester_validation_1 = require('./academicSemester.validation');
const router = express_1.default.Router();
router.post(
  '/create-semester',
  (0, validateRequest_1.default)(
    academicSemester_validation_1.SemesterValidation.createSemesterZodSchema
  ),
  AcademicSemester_controller_1.semesterController.createSemester
);
router.patch(
  '/:id',
  (0, validateRequest_1.default)(
    academicSemester_validation_1.SemesterValidation.updateSemesterZodSchema
  ),
  AcademicSemester_controller_1.semesterController.updateSemester
);
router.get(
  '/all-semester',
  AcademicSemester_controller_1.semesterController.getAllSemesters
);
router.get(
  '/:id',
  AcademicSemester_controller_1.semesterController.getSingleSemester
);
router.delete(
  '/:id',
  AcademicSemester_controller_1.semesterController.deleteSemester
);
exports.AcademicSemesterRoutes = router;
