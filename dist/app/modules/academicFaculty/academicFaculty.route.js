'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.academicFacultyRoutes = void 0;
const express_1 = __importDefault(require('express'));
const user_1 = require('../../../enums/user');
const auth_1 = __importDefault(require('../../middleware/auth'));
const validateRequest_1 = __importDefault(
  require('../../middleware/validateRequest')
);
const academicFaculty_controller_1 = require('./academicFaculty.controller');
const academicFaculty_validation_1 = require('./academicFaculty.validation');
const router = express_1.default.Router();
router.post(
  '/create-faculty',
  (0, validateRequest_1.default)(
    academicFaculty_validation_1.academicFacultyValidation
      .createFacultyZodSchema
  ),
  (0, auth_1.default)(
    user_1.ENUM_USER_ROLE.ADMIN,
    user_1.ENUM_USER_ROLE.SUPER_ADMIN
  ),
  academicFaculty_controller_1.AcademicFacultyController.createAcademicFaculty
);
router.patch(
  '/update/:id',
  (0, validateRequest_1.default)(
    academicFaculty_validation_1.academicFacultyValidation
      .updateFacultyZodSchema
  ),
  (0, auth_1.default)(
    user_1.ENUM_USER_ROLE.ADMIN,
    user_1.ENUM_USER_ROLE.SUPER_ADMIN
  ),
  academicFaculty_controller_1.AcademicFacultyController.updateAcademicFaculty
);
router.get(
  '/all-faculties',
  (0, auth_1.default)(
    user_1.ENUM_USER_ROLE.ADMIN,
    user_1.ENUM_USER_ROLE.SUPER_ADMIN,
    user_1.ENUM_USER_ROLE.FACULTY,
    user_1.ENUM_USER_ROLE.STUDENT
  ),
  academicFaculty_controller_1.AcademicFacultyController.getAllAcademicFaculties
);
router.get(
  '/:id',
  (0, auth_1.default)(
    user_1.ENUM_USER_ROLE.ADMIN,
    user_1.ENUM_USER_ROLE.SUPER_ADMIN,
    user_1.ENUM_USER_ROLE.FACULTY,
    user_1.ENUM_USER_ROLE.STUDENT
  ),
  academicFaculty_controller_1.AcademicFacultyController
    .getSingleAcademicFaculty
);
router.delete(
  '/delete/:id',
  academicFaculty_controller_1.AcademicFacultyController.deleteAcademicFaculty
);
exports.academicFacultyRoutes = router;
