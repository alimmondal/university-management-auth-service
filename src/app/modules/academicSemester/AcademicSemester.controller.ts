import { NextFunction, Request, RequestHandler, Response } from 'express';
import httpStatus from 'http-status';
import { paginationFields } from '../../../pagination';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { FilterableSemesterFields } from './academicSemester.constant';
import { IAcademicSemester } from './academicSemester.interface';
import { SemesterService } from './academicSemester.service';

// first way to create
// const createSemester: RequestHandler = async (req, res, next) => {
//   try {
//     const { ...semesterData } = req.body;
//     const result = await SemesterService.createSemesterToDb(semesterData);

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
const createSemester: RequestHandler = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { ...AcademicSemesterData } = req.body;
    const result = await SemesterService.createSemesterToDb(
      AcademicSemesterData
    );

    sendResponse<IAcademicSemester>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Academic semester created successfully',
      data: result,
    });
    next();
  }
);

const getAllSemesters = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, FilterableSemesterFields);

  const paginationOptions = pick(req.query, paginationFields);

  const result = await SemesterService.getAllSemestersFromDb(
    filters,
    paginationOptions
  );

  sendResponse<IAcademicSemester[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic semester retrieved successfully',
    meta: result.meta,
    data: result.data,
  });
});

const getSingleSemester: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id;
    const result = await SemesterService.getSingleSemesterToDb(id);

    sendResponse<IAcademicSemester>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Academic semester retrieved successfully',
      data: result,
    });
  }
);

const updateSemester: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id;
    const updatedData = req.body;
    const result = await SemesterService.updateSemesterToDb(id, updatedData);

    sendResponse<IAcademicSemester>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Academic semester updated successfully',
      data: result,
    });
  }
);

const deleteSemester: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id;
    const result = await SemesterService.deleteSemesterFromDb(id);

    sendResponse<IAcademicSemester>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Academic semester updated successfully',
      data: result,
    });
  }
);

export const semesterController = {
  createSemester,
  getAllSemesters,
  getSingleSemester,
  updateSemester,
  deleteSemester,
};
