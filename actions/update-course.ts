import { supabase } from "@/lib/supabase";

interface updateCourseProps {
    courseId: string;
    userId?: string | null;
    degreeId?: string;
    slug?: string;
    name?: string;
    credits?: number;
    year?: number;
    semester?: number;
    value?: number | null;
}

export const updateCourse = async ({
    userId,
    degreeId,
    slug,
    courseId,
    name,
    credits,
    year,
    semester,
    value,
}: updateCourseProps) => {
    try {
        // Check if the user has already updated the course
        const { data } = await supabase
            .from('course')
            .select('course_id')
            .eq('course_id', courseId)

        // If it's not, create a new one
        if (data?.length === 0) {
            const { data, error } = await supabase
                .from('course')
                .insert([
                    {
                        course_id: courseId,
                        user_id: userId,
                        degree_id: degreeId,
                        slug: slug,
                        name: name,
                        credits: credits,
                        gpa: value,
                        year: year,
                        semester: semester,
                        isSelected: true
                    }
                ])
                .select();
            console.log("RES_COURSE:", data);

            if (error?.message) {
                return error?.message;
            } 
            return null;
        } 
        else {                                          // If it's exist, update the course
            const { data, error } = await supabase
                .from('course')
                .update({
                    credits: credits,
                    gpa: value,
                    updated_at: new Date()
                })
                .match({
                    course_id: courseId,
                    user_id: userId,
                })
                .select();

            if (error?.message) {
                return error?.message;
            } 
            return null;
        }
        
    } catch (error) {
        console.error("[COURSE_UPDATE_ERROR_SUPABASE]:", error);
        return error;
    }
}