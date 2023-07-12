import httpStatus from 'http-status';
import { Schema, model } from 'mongoose';
import ApiError from '../../../errors/ApiError';
import {
  AcademicSemesterCodes,
  AcademicSemesterMoth,
  AcademicSemesterTitles,
} from './academicSemester.constant';
import {
  AcademicSemesterModel,
  IAcademicSemester,
} from './academicSemester.interface';

// Put all user instance methods in this interface:
// type IUserMethods = {
//   fullName(): string
// }

// 2. Create a Schema corresponding to the document interface.
const academicSemesterSchema = new Schema<
  IAcademicSemester,
  AcademicSemesterModel
>(
  {
    title: {
      type: String,
      required: true,
      enum: AcademicSemesterTitles,
    },
    year: {
      type: String,
      required: true,
    },
    code: {
      type: String,
      required: true,
      enum: AcademicSemesterCodes,
    },
    startMonth: {
      type: String,
      required: true,
      enum: AcademicSemesterMoth,
    },
    endMonth: {
      type: String,
      required: true,
      enum: AcademicSemesterMoth,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

academicSemesterSchema.pre('save', async function (next) {
  const isExist = await AcademicSemester.findOne({
    title: this.title,
    year: this.year,
  });
  if (isExist) {
    throw new ApiError(httpStatus.CONFLICT, 'Academic Semester already exists');
  }
  next();
});

// 3. Create a Model.
// export const User = model<IUser>('User', userSchema)
export const AcademicSemester = model<IAcademicSemester, AcademicSemesterModel>(
  'AcademicSemester',
  academicSemesterSchema
);
