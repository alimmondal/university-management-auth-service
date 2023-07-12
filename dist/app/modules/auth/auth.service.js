'use strict';
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator['throw'](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.AuthService = void 0;
/* eslint-disable no-console */
const http_status_1 = __importDefault(require('http-status'));
const config_1 = __importDefault(require('../../../config'));
const ApiError_1 = __importDefault(require('../../../errors/ApiError'));
const jwtHelpers_1 = require('../../../helpers/jwtHelpers');
const user_model_1 = require('../user/user.model');
const loginUser = payload =>
  __awaiter(void 0, void 0, void 0, function* () {
    const { id, password } = payload;
    // third method
    // check if user exists using static method
    const isUserExist = yield user_model_1.User.isUserExist(id);
    if (!isUserExist) {
      throw new ApiError_1.default(
        http_status_1.default.NOT_FOUND,
        'User not found'
      );
    }
    if (
      isUserExist.password &&
      !(yield user_model_1.User.isPasswordMatched(
        password,
        isUserExist === null || isUserExist === void 0
          ? void 0
          : isUserExist.password
      ))
    ) {
      throw new ApiError_1.default(
        http_status_1.default.UNAUTHORIZED,
        'Password mismatch'
      );
    }
    // second way to create access token as reusable
    const { id: userId, role, needsPasswordChange } = isUserExist;
    const accessToken = jwtHelpers_1.jwtHelpers.createToken(
      { userId, role },
      config_1.default.jwt.secret,
      config_1.default.jwt.expires_in
    );
    const refreshToken = jwtHelpers_1.jwtHelpers.createToken(
      { userId, role },
      config_1.default.jwt.refresh_secret,
      config_1.default.jwt.refresh_expires_in
    );
    // console.log(accessToken, refreshToken, needsPasswordChange);
    return {
      accessToken,
      refreshToken,
      needsPasswordChange,
    };
  });
const refreshToken = token =>
  __awaiter(void 0, void 0, void 0, function* () {
    //verify token
    // invalid token - synchronous
    let verifiedToken = null;
    try {
      verifiedToken = jwtHelpers_1.jwtHelpers.verifyToken(
        token,
        config_1.default.jwt.refresh_secret
      );
    } catch (err) {
      throw new ApiError_1.default(
        http_status_1.default.FORBIDDEN,
        'Invalid Refresh Token'
      );
    }
    const { userId } = verifiedToken;
    // tumi delete hye gso  kintu tumar refresh token ase
    // checking deleted user's refresh token
    const isUserExist = yield user_model_1.User.isUserExist(userId);
    if (!isUserExist) {
      throw new ApiError_1.default(
        http_status_1.default.NOT_FOUND,
        'User does not exist'
      );
    }
    //generate new token
    const newAccessToken = jwtHelpers_1.jwtHelpers.createToken(
      {
        id: isUserExist.id,
        role: isUserExist.role,
      },
      config_1.default.jwt.secret,
      config_1.default.jwt.expires_in
    );
    return {
      accessToken: newAccessToken,
    };
  });
exports.AuthService = {
  loginUser,
  refreshToken,
};
/*
  // First method
  // check if user exists using normal way
  
  const isUserExist = await User.findOne(
    { id },
    { id: 1, password: 1, needsPasswordChange: 1 }
  );

  match password
  const isPasswordMatched = await bcrypt.compare(
    password,
    isUserExist?.password
  );

  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }

  if (!isPasswordMatched(password, isUserExist?.password)
  ) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Password mismatch');
  }

*/
/*
  // Second method
  // check if user exists using instance method

  const user = new User();
  const isUserExist = await user.isUserExist(id);
  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }

  if (
    isUserExist.password &&
    !user.isPasswordMatched(password, isUserExist?.password)
  ) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Password mismatch');
  }
*/
/*
// First way to create access token
  const accessToken = jwt.sign(
    {
      id: isUserExist.id,
      role: isUserExist.role,
    },
    config.jwt.secret as Secret,
    { expiresIn: config.jwt.expires_in }
  );
  const refreshToken = jwt.sign(
    {
      id: isUserExist.id,
      role: isUserExist.role,
    },
    config.jwt.refresh_secret as Secret,
    { expiresIn: config.jwt.refresh_expires_in }
  );
*/
