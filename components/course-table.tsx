import {
    Table,
    TableBody,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import GradeSelect from "./grade-select";
import { auth } from "@clerk/nextjs";
import { supabase } from "@/lib/supabase";

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

const CourseTable = async ({
    courses,
    degreeId,
    slug,
}: CourseTableProps) => {
    const { userId } = auth();

    const fetchCoursesFromDb = async () => {
        const { data, error } = await supabase
            .from('course')
            .select('course_id, gpa')
            .match({ degree_id: degreeId, user_id: userId})

        if (error) {
            console.error('ERROR_FETCHING_GPA_FROM_DB:', error);
            return [];
        }
        
        return data || [];
    };

    const coursesFromDb = await fetchCoursesFromDb();

    return (
        <Table>
            <TableHeader>
                <TableRow className="w-full">
                    <TableHead className="w-[20%]">Code</TableHead>
                    <TableHead colSpan={2}>Course</TableHead>
                    <TableHead className="text-center w-[30%]">Grade</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {courses.map((course) => {
                    const matchingCourseFromDb = coursesFromDb.find((courseFromDb) => courseFromDb.course_id === course._id);

                    return (
                        <TableRow key={course._id}>
                            <TableCell className="font-medium">{course.courseCode}</TableCell>
                            <TableCell colSpan={2}>{course.name}</TableCell>
                            <TableCell className="text-right">
                                {matchingCourseFromDb ? (
                                    <>
                                    <p className="hidden">{matchingCourseFromDb.course_id}</p>
                                    <GradeSelect
                                        userId={userId}
                                        degreeId={degreeId}
                                        slug={slug}
                                        courseId={course._id}
                                        name={course.name}
                                        credits={course.credits}
                                        year={course.year}
                                        semester={course.semester}
                                        valueFromDb={matchingCourseFromDb?.gpa}
                                    />
                                    </>
                                ) : (
                                    <GradeSelect
                                        userId={userId}
                                        degreeId={degreeId}
                                        slug={slug}
                                        courseId={course._id}
                                        name={course.name}
                                        credits={course.credits}
                                        year={course.year}
                                        semester={course.semester}
                                        valueFromDb={null}
                                    />
                                )}
                            </TableCell>
                        </TableRow>
                    );
                })}
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