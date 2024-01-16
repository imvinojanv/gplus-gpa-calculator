"use client"

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { updateCourse } from "@/actions/update-course";
import { supabase } from "@/lib/supabase";
import { cn } from "@/lib/utils";

interface GradeSelectProps {
    userId: string | null;
    degreeId: string;
    slug: string;
    courseId: string;
    name: string;
    credits: number;
    year: number;
    semester: number;
    valueFromDb: number | null;
}

const GradeSelect = ({
    userId,
    degreeId,
    slug,
    courseId,
    name,
    credits,
    year,
    semester,
    valueFromDb
}: GradeSelectProps) => {
    const { toast } = useToast();
    const router = useRouter();

    const [value, setValue] = useState<number | null>(valueFromDb);
    const [initialized, setInitialized] = useState(false);
    
    const handleValueChange = async () => {
        try {
            if (initialized) {
                const response = await updateCourse({
                    userId,
                    degreeId,
                    slug,
                    courseId,
                    name,
                    credits,
                    year,
                    semester,
                    value: typeof value === 'number' ? value : null,
                })
                
                if(response !== null ) {
                    toast({
                        title: "⚠️ Something went wrong 👎",
                        variant: 'destructive',
                        description: (
                            <code className="text-white">
                                {response as string | undefined}
                            </code>
                        ),
                    });
                }
                // router.refresh();
            }
        } catch (error) {
            console.error("GRADE_VALUE_INTERT_ERROR:", error);
        }
    }

    useEffect(() => {
        if (initialized) {
            handleValueChange();                // Set initialized to true after the initial render
        } else {
            setInitialized(true);               // check its not the initial render
        }
    }, [value]);

    // Realtime Implementation
    useEffect(() => {
        const channels = supabase.channel('course-grade-channel')
            .on(
                'postgres_changes',
                { 
                    event: '*', 
                    schema: 'public', 
                    table: 'course',
                    filter: `user_id=eq.${userId}`,
                },
                (payload) => {
                    // Validate the user
                    if ([payload.new].length > 0 && payload.new.course_id ===courseId && payload.new.degree_id === degreeId) {
                        // console.log("UserId is sameee...");
                        router.refresh();
                    }
                }
            )
            .subscribe();

        return () => {
            channels.unsubscribe();
        };
    }, [supabase, value]);

    const handleSelectValueChange = (selectedValue: string) => {
        setValue(parseFloat(selectedValue) || null);
    };

    return (
        <Select value={value !== null ? value.toString() : ''} onValueChange={handleSelectValueChange}>
            <SelectTrigger className={cn(
                "w-full text-left bg-white/60",
                value?.toString() === '4' && "bg-[#17dcb5]/10 border-[#17dcb5]",
                (value?.toString() === '3.7' || value?.toString() === '3.3') && "bg-[#1eb7eb]/10 border-[#1eb7eb]",
                (value?.toString() === '3' || value?.toString() === '2.7') && "bg-[#C438EF]/10 border-[#C438EF]",
                (value?.toString() === '2.3' || value?.toString() === '2') && "bg-[#FD853A]/10 border-[#FD853A]",
                (value?.toString() === '1.7' || value?.toString() === '1.3' || value?.toString() === '1' || value?.toString() === '0') && "bg-[#FF3333]/10 border-[#FF3333]",
            )}>
                <SelectValue placeholder="Select grade" />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    <SelectLabel>Grades</SelectLabel>
                    <SelectItem value={`''`}>Not selected</SelectItem>
                    <SelectItem value="4">A+ / A</SelectItem>
                    <SelectItem value="3.7">A-</SelectItem>
                    <SelectItem value="3.3">B+</SelectItem>
                    <SelectItem value="3">B</SelectItem>
                    <SelectItem value="2.7">B-</SelectItem>
                    <SelectItem value="2.3">C+</SelectItem>
                    <SelectItem value="2">C</SelectItem>
                    <SelectItem value="1.7">C-</SelectItem>
                    <SelectItem value="1.3">D+</SelectItem>
                    <SelectItem value="1">D</SelectItem>
                    <SelectItem value="0">E</SelectItem>
                </SelectGroup>
            </SelectContent>
        </Select>

    )
}

export default GradeSelect