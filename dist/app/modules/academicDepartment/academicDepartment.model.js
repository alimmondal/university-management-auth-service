'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.AcademicDepartment = void 0;
const mongoose_1 = require('mongoose');
// 2. Create a Schema corresponding to the document interface.
const academicDepartmentSchema = new mongoose_1.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    academicFaculty: {
      type: mongoose_1.Schema.Types.ObjectId,
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
exports.AcademicDepartment = (0, mongoose_1.model)(
  'AcademicDepartment',
  academicDepartmentSchema
);
