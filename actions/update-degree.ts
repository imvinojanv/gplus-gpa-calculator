import { supabase } from "@/lib/supabase";

interface createDegreeProps {
    degreeId: string;
    userId: string | undefined;
    slug?: string;
    firstname?: string | null;
}

interface updateDegreeProps {
    degreeId: string;
    userId: string | undefined;
    year1GPA?: number | null;
    year2GPA?: number | null;
    year3GPA?: number | null;
    year4GPA?: number | null;
}

export const createDegree = async ({
    degreeId,
    userId,
    slug,
    firstname,
}: createDegreeProps) => {
    try {
        // Check if the user already has the degree
        const { data } = await supabase
            .from('degree')
            .select('degree_id')
            .match({
                degree_id: degreeId,
                user_id: userId,
                slug: slug
            });

        // If it's not, create a new one
        if (data?.length === 0) {
            const { data, error } = await supabase
                .from('degree')
                .insert([
                    {
                        degree_id: degreeId,
                        user_id: userId,
                        slug: slug,
                        firstname: firstname
                    }
                ])
                .select();
            // console.log("RES_DEGREE:", data);
            
            if (error?.message) {
                return error?.message;
            }
            return null;
        }
    } catch (error) {
        console.error("[DEGREE_CREATE_ERROR_SUPABASE]:", error);
        return error;
    }
}

export const updateDegree = async ({
    degreeId,
    userId,
    year1GPA,
    year2GPA,
    year3GPA,
    year4GPA
}: updateDegreeProps) => {
    try {
        // No need to check the availability of the degree
        // console.log("UPDATE_GPA:", year2GPA);
        
        const { data, error } = await supabase
            .from('degree')
            .update({
                year1_gpa: year1GPA,
                year2_gpa: year2GPA,
                year3_gpa: year3GPA,
                year4_gpa: year4GPA,
                updated_at: new Date()
            })
            .match({
                degree_id: degreeId,
                user_id: userId,
            })
            .select();
        
        console.log("[DEGREE_UPDATE_SUPABASE]:", data);
        
    } catch (error) {
        console.error("[DEGREE_UPDATE_ERROR_SUPABASE]:", error);
        return error;
    }
}