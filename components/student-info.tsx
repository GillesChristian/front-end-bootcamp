import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Student } from "@/hooks/use-students";

type StudentInfoProps = {
  student: Student | null;
  onDelete: (id: string) => void;
  isDeleting: boolean;
};

export const StudentInfo: React.FC<StudentInfoProps> = ({
  student,
  onDelete,
  isDeleting,
}) => {
  if (!student) return null;

  return (
    <div className="py-9 px-14 sm:min-w-[350px] h-full rounded-2xl bg-[#509CDB] text-white flex flex-col items-center justify-center gap-4 flex-1">
      <h2 className="text-2xl font-bold">Student Info</h2>
      <InfoItem
        label="Student Name"
        value={`${student.firstName} ${student.lastName}`}
      />
      <InfoItem label="Student ID" value={student.id} />
      <InfoItem label="Email address" value={student.email} />
      <InfoItem
        label="Date of Birth"
        value={student.dateOfBirth || "Not available"}
      />
      <div className="flex gap-4 mt-10">
        <Link href={`/students/edit/${student.id}`}>
          <Button className="bg-white hover:bg-white/80 text-black w-[100px] flex place-content-center">
            Edit
          </Button>
        </Link>
        <Button
          variant="destructive"
          className="w-[100px] flex place-content-center"
          onClick={() => onDelete(student.id)}
          disabled={isDeleting}
        >
          {isDeleting ? "Deleting..." : "Delete"}
        </Button>
      </div>
    </div>
  );
};

const InfoItem: React.FC<{ label: string; value: string }> = ({
  label,
  value,
}) => (
  <div className="text-center">
    <h3 className="font-bold">{label}</h3>
    <p>{value}</p>
  </div>
);
