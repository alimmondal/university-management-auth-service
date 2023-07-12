/* eslint-disable no-console */
import { Request, RequestHandler, Response } from 'express';

import httpStatus from 'http-status';
import config from '../../../config';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { ILoginUserResponse, IRefreshTokenResponse } from './auth.interface';
import { AuthService } from './auth.service';

const loginUser: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { ...loginData } = req.body;
    const result = await AuthService.loginUser(loginData);
    // console.log(req.body);
    const { refreshToken, ...otherResult } = result;

    // set refresh token into cookie
    const cookieOptions = {
      secure: config.env === 'production',
      httpOnly: true,
    };

    res.cookie('refreshToken', refreshToken, cookieOptions);
    delete result.refreshToken;

    sendResponse<ILoginUserResponse>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'user logged in successfully',
      data: otherResult,
    });
  }
);

const changePassword: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const user = req.user;
    // console.log(req.user, 'user');
    const { ...passwordData } = req.body;
    await AuthService.changePassword(user, passwordData);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Password changed successfully',
      // data: result,
    });
  }
);

const refreshToken: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { refreshToken } = req.cookies;
    const result = await AuthService.refreshToken(refreshToken);

    // set refresh token into cookie
    const cookieOptions = {
      secure: config.env === 'production',
      httpOnly: true,
    };

    res.cookie('refreshToken', refreshToken, cookieOptions);

    sendResponse<IRefreshTokenResponse>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'user logged in successfully',
      data: result,
    });
  }
);

export const AuthController = {
  loginUser,
  refreshToken,
  changePassword,
};
