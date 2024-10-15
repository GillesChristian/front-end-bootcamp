import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";

const courses = [
  { name: "Mathematics", totalScore: 20 },
  { name: "Physics", totalScore: 20 },
  { name: "Chemistry", totalScore: 20 },
  { name: "Biology", totalScore: 20 },
  { name: "Computer Science", totalScore: 20 },
];

export default function Subjects() {
  return (
    <div className="container h-screen ml-[230px] px-20 py-16 flex flex-col gap-10">
      <h1 className="text-4xl text-gray-400 font-bold text-center mb-6">
        My Academic Courses
      </h1>
      <Table className="min-w-full bg-white border border-gray-300">
        <TableHeader className="px-2 py-4 bg-blue-950 hover:bg-blue-950 text-white">
          <TableRow className="text-gray-500 font-bold">
            <TableHead className="px-2 py-4 text-white">Course</TableHead>
            <TableHead className="px-2 py-4 text-white">Total Score</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {courses.map((course) => (
            <TableRow key={course.name} className="odd:bg-blue-50">
              <TableCell className="px-2 py-4">{course.name}</TableCell>
              <TableCell className="px-2 py-4">{course.totalScore}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
