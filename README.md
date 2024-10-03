This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```


Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## External API Integration

The application integrates with external APIs to manage student data, ensuring dynamic and up-to-date information.

### Student API

- **Base URL**: `http://127.0.0.1:9000/api/students`

- **Endpoints**:
  - **GET /api/students**: Retrieve a list of all students.
  - **GET /api/students/{id}**: Retrieve details of a specific student.
  - **POST /api/students**: Add a new student to the system.
  - **PUT /api/students/{id}**: Update an existing student's information.
  - **DELETE /api/students/{id}**: Remove a student from the system.

### Usage in the Codebase

- **Hooks**:
  - `useStudents` (`hooks/use-students.ts`): Fetches and manages the list of students.
  - `useStudent` (`hooks/use-student.ts`): Fetches and manages a single student's data.
  - `useDeleteStudent` (`hooks/use-delete-student.ts`): Handles the deletion of a student.

- **Components**:
  - `StudentForm` (`components/Studentform.tsx`): Form for adding a new student.
  - `EditStudentForm` (`components/EditStudentForm.tsx`): Form for editing existing student information.
  - `StudentInfo` (`components/student-info.tsx`): Displays information of a selected student.

### Error Handling and Optimization

- **Error Handling**: All API interactions include error handling to manage failures gracefully and provide user feedback.
- **Performance Optimization**: Implements React Server Components (RSC) and dynamic loading to enhance performance and reduce initial load times.
