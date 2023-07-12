'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.SemesterValidation = void 0;
const zod_1 = require('zod');
const academicSemester_constant_1 = require('./academicSemester.constant');
const createSemesterZodSchema = zod_1.z.object({
  body: zod_1.z.object({
    title: zod_1.z.enum(
      [...academicSemester_constant_1.AcademicSemesterTitles],
      {
        required_error: 'title is required',
      }
    ),
    year: zod_1.z.string({
      required_error: 'year is required',
    }),
    code: zod_1.z.enum([...academicSemester_constant_1.AcademicSemesterCodes]),
    startMonth: zod_1.z.enum(
      [...academicSemester_constant_1.AcademicSemesterMoth],
      {
        required_error: 'start month is required',
      }
    ),
    endMonth: zod_1.z.enum(
      [...academicSemester_constant_1.AcademicSemesterMoth],
      {
        required_error: 'End month is required',
      }
    ),
  }),
});
const updateSemesterZodSchema = zod_1.z
  .object({
    body: zod_1.z.object({
      title: zod_1.z
        .enum([...academicSemester_constant_1.AcademicSemesterTitles], {
          required_error: 'title is required',
        })
        .optional(),
      year: zod_1.z
        .string({
          required_error: 'year is required',
        })
        .optional(),
      code: zod_1.z
        .enum([...academicSemester_constant_1.AcademicSemesterCodes])
        .optional(),
      startMonth: zod_1.z
        .enum([...academicSemester_constant_1.AcademicSemesterMoth], {
          required_error: 'start month is required',
        })
        .optional(),
      endMonth: zod_1.z
        .enum([...academicSemester_constant_1.AcademicSemesterMoth], {
          required_error: 'End month is required',
        })
        .optional(),
    }),
  })
  .refine(
    data =>
      (data.body.title && data.body.code) ||
      (!data.body.title && !data.body.code),
    { message: 'data and code are required or neither' }
  );
exports.SemesterValidation = {
  createSemesterZodSchema,
  updateSemesterZodSchema,
};
