import { User } from "@/hooks/use-students";

type StudentInfoProps = {
  student: User | null;
};

export const TopStudentInfo: React.FC<StudentInfoProps> = ({ student }) => {
  if (!student) return null;

  return (
    <div className="py-9 px-14 sm:min-w-[350px] h-full rounded-2xl bg-[#509CDB] text-white flex flex-col items-center justify-center gap-4 flex-1">
      <h2 className="text-2xl font-bold">Student Info</h2>
      <InfoItem label="Student Name" value={`${student.username}`} />
      <InfoItem label="Student ID" value={student.id} />
      <InfoItem label="Email address" value={student.email} />
      <InfoItem
        label="Date of Birth"
        value={student.date_of_birth || "Not available"}
      />
      <InfoItem
        label="Grade"
        value={student.date_of_birth || "Not available"}
      />
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
