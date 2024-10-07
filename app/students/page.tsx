import { ChartNoAxesGantt, UserPlus, UserX } from "lucide-react";
import Link from "next/link";

export default function page() {
  const info = [
    {
      id: 1,
      route: "/students/subjects",
      icon: ChartNoAxesGantt,
      title: "View all Subjects",
      description: "View all the register subjects for this semester.",
    },
    {
      id: 2,
      route: "/students/grades",
      icon: UserPlus,
      title: "Academic Performance",
      description: "Vew your academic performances for the semester.",
    },
    {
      id: 3,
      route: "/students/profile",
      icon: UserX,
      title: "Student Profile",
      description: "you can also view and edit your user profile.",
    },
  ];
  return (
    <div className="flex flex-col gap-20 sm:ml-[256px] text-center">
      <div className="flex flex-col gap-2">
        <h1 className="text-xl sm:text-4xl font-bold text-gray-400">
          Welcome to the Students Dashboard
        </h1>
        <p className="text-base sm:text-xl font-bold text-black">
          Here is how you can manage students{" "}
        </p>
      </div>
      <div className="flex flex-col gap-16">
        {info.map((item) => (
          <Link href={item.route} key={item.id} className="group">
            <div className="flex items-start justify-start gap-7 group-hover:px-2 transition-all duration-300 ease-in-out">
              <div className="flex items-center justify-center p-2 rounded-sm bg-[#EFF3FA] h-fit">
                <item.icon className="h-6 w-6" />
              </div>
              <div className="flex items-start flex-col">
                <h3 className="text-lg sm:text-2xl font-semibold text-gray-400">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-gray-400">
                  {item.description}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
