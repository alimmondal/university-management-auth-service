// /* eslint-disable @typescript-eslint/no-this-alias */
// import bcrypt from 'bcrypt';
// import { Schema, model } from 'mongoose';
// import config from '../../../config';
// import { IUser, UserModel } from './user.interface';

// // 2. Create a Schema corresponding to the document interface.
// const userSchema = new Schema<IUser, UserModel>(
//   {
//     id: {
//       type: String,
//       required: true,
//       unique: true,
//     },
//     role: {
//       type: String,
//       required: true,
//       // enum: ['admin', 'student', 'faculty'],
//     },
//     password: {
//       type: String,
//       required: true,
//     },
//     student: {
//       type: Schema.Types.ObjectId,
//       ref: 'Student',
//     },
//     faculty: {
//       type: Schema.Types.ObjectId,
//       ref: 'Faculty',
//     },
//     admin: {
//       type: Schema.Types.ObjectId,
//       ref: 'Admin',
//     },
//   },
//   {
//     timestamps: true,
//     toJSON: {
//       virtuals: true,
//     },
//   }
// );

// //has password
// userSchema.pre('save', async function () {
//   const user = this;
//   user.password = await bcrypt.hash(
//     user.password,
//     Number(config.bcrypt_salt_rounds)
//   );
// });

// // 3. Create a Model.
// // export const User = model<IUser>('User', userSchema)
// export const User = model<IUser, UserModel>('User', userSchema);
