import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";

export const StudentTableSkeleton = () => {
  return (
    <Table className="w-[600px]">
      <TableHeader className="px-2 py-4">
        <TableRow className="text-gray-500 font-bold">
          <TableHead className="px-2 py-4">First Name</TableHead>
          <TableHead className="px-2 py-4">Last Name</TableHead>
          <TableHead className="px-2 py-4">Student ID</TableHead>
          <TableHead className="px-2 py-4">Email Address</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {[...Array(5)].map((_, index) => (
          <TableRow key={index}>
            <TableCell className="px-2 py-4">
              <Skeleton className="h-4 w-[100px]" />
            </TableCell>
            <TableCell className="px-2 py-4">
              <Skeleton className="h-4 w-[100px]" />
            </TableCell>
            <TableCell className="px-2 py-4">
              <Skeleton className="h-4 w-[80px]" />
            </TableCell>
            <TableCell className="px-2 py-4">
              <Skeleton className="h-4 w-[150px]" />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
