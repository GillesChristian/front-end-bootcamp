import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table";
  import { Skeleton } from "@/components/ui/skeleton";
  
  export const SubjectTableSkeleton = () => {
    return (
      <Table className="w-[600px]">
        <TableHeader className="px-2 py-4">
          <TableRow className="text-gray-500 font-bold">
            <TableHead className="px-2 py-4">S/N</TableHead>
            <TableHead className="px-2 py-4">Subject Code</TableHead>
            <TableHead className="px-2 py-4">Subject</TableHead>
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
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
  };