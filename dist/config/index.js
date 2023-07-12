'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
/* eslint-disable no-undef */
const dotenv_1 = __importDefault(require('dotenv'));
const path_1 = __importDefault(require('path'));
dotenv_1.default.config({ path: path_1.default.join(process.cwd(), '.env') });
exports.default = {
  env: process.env.NODE_ENV,
  port: process.env.PORT,
  database_url: process.env.DATABASE_URL,
  default_student_pass: process.env.DEFAULT_STUDENT_PASS,
  default_faculty_pass: process.env.DEFAULT_FACULTY_PASS,
  default_admin_pass: process.env.DEFAULT_ADMIN_PASS,
  bcrypt_salt_rounds: process.env.BCRYPT_SALTROUNDS,
  jwt: {
    secret: process.env.JWT_SECRET,
    refresh_secret: process.env.JWT_REFRESH_SECRET,
    refresh_expires_in: process.env.JWT_EXPIRES_EXPIRES_IN,
    expires_in: process.env.JWT_EXPIRES_IN,
  },
};
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.join(process.cwd(), '.env') });
// export default {
//   env: process.env.NODE_ENV,
//   port: process.env.PORT,
//   local_database_url: process.env.LOCAL_DATABASE_URL,
//   database_url: process.env.DATABASE_URL,
//   default_student_password: process.env.DEFAULT_STUDENT_PASSWORD,
//   default_student_pass: process.env.DEFAULT_FACULTY_PASSWORD,
//   default_admin_pass: process.env.DEFAULT_ADMIN_PASSWORD,
// };
