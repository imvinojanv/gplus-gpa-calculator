interface calculateAverageGPAProps {
    year1_gpa: number | null;
    year2_gpa: number | null;
    year3_gpa: number | null;
    year4_gpa: number | null;
}

export const calculateAverageGPA = (data: calculateAverageGPAProps[]): number => {
    if (data && data.length >= 0) {
        const validGPAs: number[] = [];
    
        data.forEach((entry) => {
            const gpas = [entry.year1_gpa, entry.year2_gpa, entry.year3_gpa, entry.year4_gpa];
            
            const validGPAsForEntry = gpas.filter((gpa) => gpa !== null) as number[];
        
            validGPAs.push(...validGPAsForEntry);
        });
    
        const sumOfValidGPAs = validGPAs.reduce((sum, gpa) => sum + gpa, 0);
    
        const averageGPA = validGPAs.length > 0 ? sumOfValidGPAs / validGPAs.length : 0;
    
        return averageGPA;
    }
    return 0;
}