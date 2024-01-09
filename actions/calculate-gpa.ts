interface CalculateGpaProps {
    course_id: string;
    gpa: number;
    credits: number;
}

export const calculateGPA = (courses: CalculateGpaProps[]): number => {
    let totalGradePoints = 0;
    let totalCredits = 0;

    // console.log("COURSES_CAL_GPA:", courses.length);
    
    if (courses && courses.length > 0) {
        for (const course of courses) {
            totalGradePoints += course.gpa * course.credits;
            totalCredits += course.credits;
        }
    
        const gpa = totalGradePoints / totalCredits;
    
        return isNaN(gpa) ? 0 : gpa; // Return 0 if there's a division by zero
    }

    return 0;
}