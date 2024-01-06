import { supabase } from "@/lib/supabase";
import { checkAvailable } from "./check-available";

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
        const isAvailable = await checkAvailable({
            db:'course', 
            id: courseId
        }) 

        if (!isAvailable) {
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
            console.log("RES_DATA:", data);

            if (error?.message) {
                return error?.message;
            } 
            return null;
        } 
        else {
            const { data, error } = await supabase
                .from('course')
                .update({
                    gpa: value,
                })
                .eq('course_id', courseId)
                .select();
            console.log("RES_DATA:", data);

            if (error?.message) {
                return error?.message;
            } 
            return null;
        }
        
    } catch (error) {
        console.error("[GRADE_VALUE_UPDATE_ERROR]", error);
        return error;
    }
}