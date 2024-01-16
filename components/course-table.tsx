"use client"

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
import { Badge } from "./ui/badge";

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
    coursesFromDb: {
        course_id: string;
        gpa: number;
        credits: number;
    }[] | null;
    degreeId: string;
    slug: string;
    userId: string | null;
    gpa: number;
}

const CourseTable = ({
    courses,
    coursesFromDb,
    degreeId,
    slug,
    userId,
    gpa
}: CourseTableProps) => {

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
                    if (coursesFromDb !== null) {
                        const matchingCourseFromDb = coursesFromDb.find((courseFromDb) => courseFromDb.course_id === course._id);
                        
                        return (
                            <TableRow key={course._id}>
                                <TableCell className="font-medium">{course.courseCode}</TableCell>
                                <TableCell colSpan={2}>
                                    {course.name}
                                    {course.courseType === 'optional' && (
                                        <Badge variant="courseType" className="ml-2">
                                            Opt
                                        </Badge>
                                    )}
                                    </TableCell>
                                <TableCell className="text-right">
                                    {matchingCourseFromDb ? (
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
                    }

                })}
            </TableBody>

            <TableFooter>
                <TableRow>
                    <TableCell colSpan={3} className="max-md:text-sm text-muted-foreground">Semester&apos;s GPA</TableCell>
                    <TableCell className="md:text-lg text-muted-foreground text-right font-bold">
                        {gpa.toFixed(2)}
                    </TableCell>
                </TableRow>
            </TableFooter>
        </Table>
    )
}

export default CourseTable