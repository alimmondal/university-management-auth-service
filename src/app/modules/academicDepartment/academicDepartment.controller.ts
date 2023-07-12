import { NextFunction, Request, RequestHandler, Response } from 'express';
import httpStatus from 'http-status';
import { paginationFields } from '../../../pagination';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { academicDepartmentFilterableFields } from './academicDepartment.constant';
import { IAcademicDepartment } from './academicDepartment.interface';
import { AcademicDepartmentService } from './academicDepartment.service';

// first way to create
// const createAcademicDepartment: RequestHandler = async (req, res, next) => {
//   try {
//     const { ...semesterData } = req.body;
//     const result = await AcademicDepartmentService.createDepartmentToDb(semesterData);

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
const createAcademicDepartment: RequestHandler = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { ...AcademicDepartmentData } = req.body;
    const result = await AcademicDepartmentService.createDepartmentToDb(
      AcademicDepartmentData
    );

    sendResponse<IAcademicDepartment>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Academic Faculty created successfully',
      data: result,
    });
    next();
  }
);

const getAllAcademicDepartments = catchAsync(
  async (req: Request, res: Response) => {
    const filters = pick(req.query, academicDepartmentFilterableFields);

    const paginationOptions = pick(req.query, paginationFields);

    const result = await AcademicDepartmentService.getAllDepartmentsFromDb(
      filters,
      paginationOptions
    );

    sendResponse<IAcademicDepartment[]>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Academic Faculty retrieved successfully',
      meta: result.meta,
      data: result.data,
    });
  }
);

const getSingleAcademicDepartment: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id;
    const result = await AcademicDepartmentService.getSingleDepartmentFromDb(
      id
    );

    sendResponse<IAcademicDepartment>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Academic semester retrieved successfully',
      data: result,
    });
  }
);

const updateAcademicDepartment: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id;
    const updatedData = req.body;
    const result = await AcademicDepartmentService.updateDepartmentToDb(
      id,
      updatedData
    );

    sendResponse<IAcademicDepartment>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Academic Faculty updated successfully',
      data: result,
    });
  }
);

const deleteAcademicDepartments: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id;
    const result = await AcademicDepartmentService.deleteDepartmentFromDb(id);

    sendResponse<IAcademicDepartment>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Academic Faculty deleted successfully',
      data: result,
    });
  }
);

export const AcademicFacultyController = {
  createAcademicDepartment,
  getAllAcademicDepartments,
  getSingleAcademicDepartment,
  updateAcademicDepartment,
  deleteAcademicDepartments,
};
