import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import GradeSelect from "./grade-select";
import { auth } from "@clerk/nextjs";

interface CourseTableProps {
    courses: {
        _id: string;
        name: string;
        courseCode: string;
        credits: number;
        year: number;
        semester: number;
        courseType: string;
    }[];
    degreeId: string;
    slug: string;
}

const CourseTable = ({
    courses,
    degreeId,
    slug,
}: CourseTableProps) => {
    const { userId } = auth();
    console.log(degreeId);
    
    return (
        <Table>
            <TableCaption className="-mt-1 py-2 bg-slate-200/40">Your academic performance</TableCaption>
            <TableHeader>
                <TableRow className="w-full">
                    <TableHead className="w-[20%]">Code</TableHead>
                    <TableHead colSpan={2}>Course</TableHead>
                    <TableHead className="text-center w-[30%]">Grade</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {courses.map((course) => (
                    <TableRow key={course._id}>
                        <TableCell className="font-medium">{course.courseCode}</TableCell>
                        <TableCell colSpan={2}>{course.name}</TableCell>
                        <TableCell className="text-right">
                            <GradeSelect
                                userId={userId}
                                degreeId={degreeId}
                                slug={slug}
                                courseId={course._id}
                                name={course.name}
                                credits={course.credits}
                                year={course.year}
                                semester={course.semester}
                            />
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
            <TableFooter>
                <TableRow>
                    <TableCell colSpan={3} className="text-[#666]">Semester's GPA</TableCell>
                    <TableCell className="text-right font-bold">3.00</TableCell>
                </TableRow>
            </TableFooter>
        </Table>
    )
}

export default CourseTable