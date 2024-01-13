# Data Fetchign methods

## Fetch the courses from SANITY
const coursesForSemiOne = await getCourses({
    degreeId: degreeId,
    year: currentYear,
    semester: 1
});

const coursesForSemiTwo = await getCourses({
    degreeId: degreeId,
    year: currentYear,
    semester: 2
});


## Fetch the courses from SUPABASE
const { data: coursesFromDbForSemiOne, error:errorFromDbSemiOne } = await supabase
    .from('course')
    .select('course_id, gpa, credits')
    .match({ 
        degree_id: degreeId, 
        user_id: user?.id,
        year: currentYear,
        semester: 1
    });

const { data: coursesFromDbForSemiTwo, error:errorFromDbSemiTwo } = await supabase
    .from('course')
    .select('course_id, gpa, credits')
    .match({ 
        degree_id: degreeId, 
        user_id: user?.id,
        year: currentYear,
        semester: 2
    });

if (errorFromDbSemiOne) {
    console.error('[ERROR_FETCHING_COURSES_FROM_DB]:', errorFromDbSemiOne);
}
if (errorFromDbSemiTwo) {
    console.error('[ERROR_FETCHING_COURSES_FROM_DB]:', errorFromDbSemiTwo);
}