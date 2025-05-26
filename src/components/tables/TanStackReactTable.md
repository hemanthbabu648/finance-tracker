# Usage

## Follow this approach to avoid infinite re-rendering of the table.

```tsx
import BasicReactTable from '@/components/Tables/BasicReactTable';
import { studentDataByAcademicYear } from '@/constants/student';
import { ColumnDef } from '@tanstack/react-table';

const studentDataByAcademicYear: Student[] = [
  {
    id: 1,
    name: 'Alice Johnson',
    academicYears: [
      {
        year: '2017-2018',
        semesters: [
          {
            semesterName: 'SEM-1',
            courses: [
              {
                courseName: 'Mathematics',
                assignments: [85, 90, 78],
                midExam: [88, 76, 90],
                finalExam: 92,
              },
              {
                courseName: 'Science',
                assignments: [75, 80, 70],
                midExam: [85, 90, 78],
                finalExam: 80,
              },
            ],
          },
          {
            semesterName: 'SEM-2',
            courses: [
              {
                courseName: 'History',
                assignments: [90, 92, 89],
                midExam: [85, 90, 78],
                finalExam: 94,
              },
              {
                courseName: 'English',
                assignments: [88, 85, 90],
                midExam: [88, 76, 90],
                finalExam: 89,
              },
            ],
          },
        ],
      },
      {
        year: '2018-2019',
        semesters: [
          {
            semesterName: 'SEM-1',
            courses: [
              {
                courseName: 'Mathematics',
                assignments: [80, 85, 88],
                midExam: [78, 80, 82],
                finalExam: 90,
              },
            ],
          },
          {
            semesterName: 'SEM-2',
            courses: [
              {
                courseName: 'Science',
                assignments: [78, 80, 82],
                midExam: [80, 85, 88],
                finalExam: 81,
              },
            ],
          },
        ],
      },
    ],
  },
];

const columns = React.useMemo<ColumnDef<Student>[]>(
  () => [
    {
      header: 'ID',
      cell: (row) => row.renderValue(),
      accessorKey: 'id',
    },
    {
      header: 'Name',
      cell: (row) => row.renderValue(),
      accessorKey: 'name',
    },
    {
      header: 'Academic Year',
      cell: (row) => {
        return <div>{JSON.stringify(row.row.original.name)}</div>;
      },
      accessorKey: 'academicYears',
    },
  ],
  [],
);

<div className="mt-4">
  <BasicReactTable data={studentDataByAcademicYear} columns={columns} />
</div>;
```
