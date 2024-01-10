"use client"

import { useEffect, useState } from "react";

import { calculateAverageGPA } from "@/actions/calculate-average-gpa";
import { supabase } from "@/lib/supabase";

interface OverallGPAProps {
    degreeData: {
        degree_id: string,
        year1_gpa: number | null,
        year2_gpa: number | null,
        year3_gpa: number | null,
        year4_gpa: number | null
    }[] | null;
    degreeId: string;
    userId: string | undefined;
}

const OverallGPA = ({
    degreeData,
    degreeId,
    userId
}: OverallGPAProps) => {
    const initialGPA: number = calculateAverageGPA(degreeData as any | null);
    const [overallGPA, setOverallGPA] = useState<number>(initialGPA);
   
    // Real-time Implementation
    useEffect(() => {
        const channels = supabase.channel('custom-all-channel2')
            .on(
                'postgres_changes',
                { 
                    event: '*', 
                    schema: 'public', 
                    table: 'degree'
                },
                (payload) => {
                    // console.log('Change received!', JSON.stringify(payload.new));
                    // Validate the user and degree
                    if ([payload.new].length > 0 && payload.new.user_id === userId && payload.new.degree_id === degreeId) {
                        setOverallGPA(calculateAverageGPA([payload.new] as any | null))
                    }
                }
            )
            .subscribe();

        return () => {
            channels.unsubscribe();
        };
    }, [supabase, overallGPA]);
    
    return overallGPA.toFixed(2);
}

export default OverallGPA;