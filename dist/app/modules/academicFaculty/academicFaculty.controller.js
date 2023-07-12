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
var __rest =
  (this && this.__rest) ||
  function (s, e) {
    var t = {};
    for (var p in s)
      if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === 'function')
      for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
        if (
          e.indexOf(p[i]) < 0 &&
          Object.prototype.propertyIsEnumerable.call(s, p[i])
        )
          t[p[i]] = s[p[i]];
      }
    return t;
  };
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.AcademicFacultyController = void 0;
const http_status_1 = __importDefault(require('http-status'));
const pagination_1 = require('../../../pagination');
const catchAsync_1 = __importDefault(require('../../../shared/catchAsync'));
const pick_1 = __importDefault(require('../../../shared/pick'));
const sendResponse_1 = __importDefault(require('../../../shared/sendResponse'));
const academicFaculty_constant_1 = require('./academicFaculty.constant');
const academicFaculty_service_1 = require('./academicFaculty.service');
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
const createAcademicFaculty = (0, catchAsync_1.default)((req, res, next) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const AcademicFacultyData = __rest(req.body, []);
    const result =
      yield academicFaculty_service_1.AcademicFacultyService.createFacultyToDb(
        AcademicFacultyData
      );
    (0, sendResponse_1.default)(res, {
      statusCode: http_status_1.default.OK,
      success: true,
      message: 'Academic Faculty created successfully',
      data: result,
    });
    next();
  })
);
const getAllAcademicFaculties = (0, catchAsync_1.default)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.headers.authorization);
    console.log(req.user);
    const filters = (0, pick_1.default)(
      req.query,
      academicFaculty_constant_1.academicFacultyFilterableFields
    );
    const paginationOptions = (0, pick_1.default)(
      req.query,
      pagination_1.paginationFields
    );
    const result =
      yield academicFaculty_service_1.AcademicFacultyService.getAllFacultyFromDb(
        filters,
        paginationOptions
      );
    (0, sendResponse_1.default)(res, {
      statusCode: http_status_1.default.OK,
      success: true,
      message: 'Academic Faculty retrieved successfully',
      meta: result.meta,
      data: result.data,
    });
  })
);
const getSingleAcademicFaculty = (0, catchAsync_1.default)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const result =
      yield academicFaculty_service_1.AcademicFacultyService.getSingleFacultyFromDb(
        id
      );
    (0, sendResponse_1.default)(res, {
      statusCode: http_status_1.default.OK,
      success: true,
      message: 'Academic semester retrieved successfully',
      data: result,
    });
  })
);
const updateAcademicFaculty = (0, catchAsync_1.default)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const updatedData = req.body;
    const result =
      yield academicFaculty_service_1.AcademicFacultyService.updateFacultyToDb(
        id,
        updatedData
      );
    (0, sendResponse_1.default)(res, {
      statusCode: http_status_1.default.OK,
      success: true,
      message: 'Academic Faculty updated successfully',
      data: result,
    });
  })
);
const deleteAcademicFaculty = (0, catchAsync_1.default)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const result =
      yield academicFaculty_service_1.AcademicFacultyService.deleteFacultyFromDb(
        id
      );
    (0, sendResponse_1.default)(res, {
      statusCode: http_status_1.default.OK,
      success: true,
      message: 'Academic Faculty deleted successfully',
      data: result,
    });
  })
);
exports.AcademicFacultyController = {
  createAcademicFaculty,
  getAllAcademicFaculties,
  getSingleAcademicFaculty,
  updateAcademicFaculty,
  deleteAcademicFaculty,
};
