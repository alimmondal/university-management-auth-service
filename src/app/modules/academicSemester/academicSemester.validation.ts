import { z } from 'zod';
import {
  AcademicSemesterCodes,
  AcademicSemesterMoth,
  AcademicSemesterTitles,
} from './academicSemester.constant';

const createSemesterZodSchema = z.object({
  body: z.object({
    title: z.enum([...AcademicSemesterTitles] as [string, ...string[]], {
      required_error: 'title is required',
    }),
    year: z.string({
      required_error: 'year is required',
    }),
    code: z.enum([...AcademicSemesterCodes] as [string, ...string[]]),
    startMonth: z.enum([...AcademicSemesterMoth] as [string, ...string[]], {
      required_error: 'start month is required',
    }),
    endMonth: z.enum([...AcademicSemesterMoth] as [string, ...string[]], {
      required_error: 'End month is required',
    }),
  }),
});

const updateSemesterZodSchema = z
  .object({
    body: z.object({
      title: z
        .enum([...AcademicSemesterTitles] as [string, ...string[]], {
          required_error: 'title is required',
        })
        .optional(),
      year: z
        .string({
          required_error: 'year is required',
        })
        .optional(),
      code: z
        .enum([...AcademicSemesterCodes] as [string, ...string[]])
        .optional(),
      startMonth: z
        .enum([...AcademicSemesterMoth] as [string, ...string[]], {
          required_error: 'start month is required',
        })
        .optional(),
      endMonth: z
        .enum([...AcademicSemesterMoth] as [string, ...string[]], {
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

export const SemesterValidation = {
  createSemesterZodSchema,
  updateSemesterZodSchema,
};
