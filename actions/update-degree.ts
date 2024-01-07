import { supabase } from "@/lib/supabase";

interface updateDegreeProps {
    degreeId: string;
    userId: string | undefined;
    slug: string;
    year1GPA?: number;
    year2GPA?: number;
    year3GPA?: number;
    year4GPA?: number;
    firstname?: string | null;
}

export const updateDegree = async ({
    degreeId,
    userId,
    slug,
    year1GPA,
    year2GPA,
    year3GPA,
    year4GPA,
    firstname
}: updateDegreeProps) => {
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
        console.log("Already registered the user!");
        
    } catch (error) {
        console.error("[DEGREE_UPDATE_ERROR_SUPABASE]:", error);
        return error;
    }
}