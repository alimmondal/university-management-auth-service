/* eslint-disable no-console */
import { NextFunction, Request, RequestHandler, Response } from 'express';
import httpStatus from 'http-status';
import { paginationFields } from '../../../pagination';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { academicFacultyFilterableFields } from './academicFaculty.constant';
import { IAcademicFaculty } from './academicFaculty.interface';
import { AcademicFacultyService } from './academicFaculty.service';

// first way to create
// const createAcademicFaculty: RequestHandler = async (req, res, next) => {
//   try {
//     const { ...semesterData } = req.body;
//     const result = await SemesterService.createFacultyToDb(semesterData);

//     res.status(200).json({
//       success: true,
//       message: 'Semester created successfully',
//       data: result,
//     });
//   } catch (error) {
//     next(error);
//   }
// };

// second way to create
const createAcademicFaculty: RequestHandler = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { ...AcademicFacultyData } = req.body;
    const result = await AcademicFacultyService.createFacultyToDb(
      AcademicFacultyData
    );

    sendResponse<IAcademicFaculty>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Academic Faculty created successfully',
      data: result,
    });
    next();
  }
);

const getAllAcademicFaculties = catchAsync(
  async (req: Request, res: Response) => {
    console.log(req.headers.authorization);
    console.log(req.user);

    const filters = pick(req.query, academicFacultyFilterableFields);

    const paginationOptions = pick(req.query, paginationFields);

    const result = await AcademicFacultyService.getAllFacultyFromDb(
      filters,
      paginationOptions
    );

    sendResponse<IAcademicFaculty[]>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Academic Faculty retrieved successfully',
      meta: result.meta,
      data: result.data,
    });
  }
);

const getSingleAcademicFaculty: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id;
    const result = await AcademicFacultyService.getSingleFacultyFromDb(id);

    sendResponse<IAcademicFaculty>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Academic semester retrieved successfully',
      data: result,
    });
  }
);

const updateAcademicFaculty: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id;
    const updatedData = req.body;
    const result = await AcademicFacultyService.updateFacultyToDb(
      id,
      updatedData
    );

    sendResponse<IAcademicFaculty>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Academic Faculty updated successfully',
      data: result,
    });
  }
);

const deleteAcademicFaculty: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id;
    const result = await AcademicFacultyService.deleteFacultyFromDb(id);

    sendResponse<IAcademicFaculty>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Academic Faculty deleted successfully',
      data: result,
    });
  }
);

export const AcademicFacultyController = {
  createAcademicFaculty,
  getAllAcademicFaculties,
  getSingleAcademicFaculty,
  updateAcademicFaculty,
  deleteAcademicFaculty,
};
