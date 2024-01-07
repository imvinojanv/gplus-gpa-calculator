import { auth } from "@clerk/nextjs";

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
import { supabase } from "@/lib/supabase";
import { calculateGPA } from "@/actions/calculate-gpa";

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
    year: number;
    semester: number;
}

const CourseTable = async ({
    courses,
    degreeId,
    slug,
    year,
    semester
}: CourseTableProps) => {
    const { userId } = auth();

    const fetchCoursesFromDb = async () => {
        const { data, error } = await supabase
            .from('course')
            .select('course_id, gpa, credits')
            .match({ 
                degree_id: degreeId, 
                user_id: userId,
                year: year,
                semester: semester
            });

        if (error) {
            console.error('ERROR_FETCHING_GPA_FROM_DB:', error);
            return [];
        }
        
        return data || [];
    };

    const coursesFromDb = await fetchCoursesFromDb();

    const gpaResults = calculateGPA(coursesFromDb);
    // console.log("GPA:", gpaResults);

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
                    <TableCell colSpan={3} className="max-md:text-sm text-muted-foreground">Semester's GPA</TableCell>
                    <TableCell className="md:text-lg text-muted-foreground text-right font-bold">{gpaResults.toFixed(2)}</TableCell>
                </TableRow>
            </TableFooter>
        </Table>
    )
}

export default CourseTable