'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.AcademicFaculty = void 0;
const mongoose_1 = require('mongoose');
// 2. Create a Schema corresponding to the document interface.
const academicFacultySchema = new mongoose_1.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
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
exports.AcademicFaculty = (0, mongoose_1.model)(
  'AcademicFaculty',
  academicFacultySchema
);
