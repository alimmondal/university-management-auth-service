'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.FilterableSemesterFields =
  exports.searchableSemesterFields =
  exports.academicSemesterTitleCodeMapper =
  exports.AcademicSemesterMoth =
  exports.AcademicSemesterCodes =
  exports.AcademicSemesterTitles =
    void 0;
exports.AcademicSemesterTitles = ['Autumn', 'Summer', 'Fall'];
exports.AcademicSemesterCodes = ['01', '02', '03'];
exports.AcademicSemesterMoth = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];
exports.academicSemesterTitleCodeMapper = {
  Autumn: '01',
  Summer: '02',
  Fall: '03',
};
exports.searchableSemesterFields = ['title', 'code', 'year'];
exports.FilterableSemesterFields = ['searchTerm', 'title', 'code', 'year'];
