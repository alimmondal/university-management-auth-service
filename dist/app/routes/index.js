'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const express_1 = __importDefault(require('express'));
const academicDepartment_route_1 = require('../modules/academicDepartment/academicDepartment.route');
const academicFaculty_route_1 = require('../modules/academicFaculty/academicFaculty.route');
const academicSemester_route_1 = require('../modules/academicSemester/academicSemester.route');
const admin_route_1 = require('../modules/admin/admin.route');
const auth_routes_1 = require('../modules/auth/auth.routes');
const faculty_route_1 = require('../modules/faculty/faculty.route');
const managementDepartment_route_1 = require('../modules/managementDepartment/managementDepartment.route');
const student_route_1 = require('../modules/student/student.route');
const user_routes_1 = require('../modules/user/user.routes');
const router = express_1.default.Router();
//first way to configure routes
const moduleRoutes = [
  {
    path: '/auth',
    route: auth_routes_1.AuthRoutes,
  },
  {
    path: '/users',
    route: user_routes_1.UserRoutes,
  },
  {
    path: '/semester',
    route: academicSemester_route_1.AcademicSemesterRoutes,
  },
  {
    path: '/academic-faculty',
    route: academicFaculty_route_1.academicFacultyRoutes,
  },
  {
    path: '/academic-department',
    route: academicDepartment_route_1.academicDepartmentRoutes,
  },
  {
    path: '/management-departments',
    route: managementDepartment_route_1.ManagementDepartmentRoutes,
  },
  {
    path: '/students',
    route: student_route_1.StudentRoutes,
  },
  {
    path: '/faculties',
    route: faculty_route_1.FacultyRoutes,
  },
  {
    path: '/admin',
    route: admin_route_1.AdminRoutes,
  },
];
moduleRoutes.forEach(route => router.use(route.path, route.route));
// second way to configure routes
// router.use('/users', UserRoutes);
// router.use('/semester', SemesterRoutes);
// router.use('/academic-faculty', academicFacultyRoutes);
// router.use('/academic-department', academicDepartmentRoutes);
exports.default = router;
