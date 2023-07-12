import { Schema, model } from 'mongoose';

import {
  AcademicDepartmentModel,
  IAcademicDepartment,
} from './academicDepartment.interface';

// 2. Create a Schema corresponding to the document interface.
const academicDepartmentSchema = new Schema<
  IAcademicDepartment,
  AcademicDepartmentModel
>(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    academicFaculty: {
      type: Schema.Types.ObjectId,
      ref: 'AcademicFaculty',
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

// 3. Create a Model.
// export const User = model<IUser>('User', userSchema)

// or
// 3. Create a static Model.
export const AcademicDepartment = model<
  IAcademicDepartment,
  AcademicDepartmentModel
>('AcademicDepartment', academicDepartmentSchema);
