import { supabase } from "@/lib/supabase";

interface checkAvailableProps {
    db: string;
    id: string | undefined;
}

export const checkAvailable = async ({
    db,
    id,
}: checkAvailableProps): Promise<boolean> => {
    try {
        if (db === 'course') {
            const { data } = await supabase
                .from('course')
                .select('course_id')
                .eq('course_id', id)
            
            if (data?.length === 0) {
                return false;
            }
            return true;
        } else if (db === 'degree') {
            const { data } = await supabase
                .from('degree')
                .select('degree_id')
                .eq('degree_id', id)
            
            if (data?.length === 0) {
                return false;
            }
            return true;
        }
        return false;
    } catch (error) {
        console.error("[CHECK_AVAILABLE_ERROR]", error);
        return false;
    }
}