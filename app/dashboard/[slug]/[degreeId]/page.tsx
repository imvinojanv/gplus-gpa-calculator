import { getCourses } from "@/sanity/actions";
import Image from "next/image";
import { auth, currentUser } from "@clerk/nextjs";

import { cn } from "@/lib/utils";
import { supabase } from "@/lib/supabase";
import { calculateGPA } from "@/actions/calculate-gpa";
import { createDegree, updateDegree } from "@/actions/update-degree";
import { calculateAverageGPA } from "@/actions/calculate-average-gpa";

import CourseTable from "@/components/course-table";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

const DegreePage = async ({
  params,
  searchParams
}: {
  params: { slug: string; degreeId: string },
  searchParams: { year: number };
}) => {
  const { slug, degreeId } = params;
  const { year: currentYear } = searchParams;

  const user = await currentUser();
  const { userId } = auth();

  /////////// Fetch the courses from SANITY ////////////
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
  //////////?????????????????????????????????///////////

  ////////// Fetch the courses from SUPABASE ///////////
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
  ///////////???????????????????????????///////////

  //////// Create the degree if a new user logged in /////////
  try {
    const res_create_degree = await createDegree({
      degreeId: degreeId,
      userId: user?.id,
      slug: slug,
      firstname: user?.firstName
    })
  } catch (error) {
    console.error("[DEGREE_CREATE_ERROR]:", error);
  }
  ///////////???????????????????????????///////////

  //////// Calculate GPA for the SEMESTER /////////
  const gpaForSemiOne = calculateGPA(coursesFromDbForSemiOne as any | null);
  const gpaForSemiTwo = calculateGPA(coursesFromDbForSemiTwo as any | null);
  
  const gpaForYear = (gpaForSemiTwo === 0 && gpaForSemiOne === 0) ? null : (gpaForSemiTwo === 0 ? gpaForSemiOne : (gpaForSemiOne + gpaForSemiTwo) / 2);
  // console.log("gpaForYear:", gpaForYear, "- gpaForSemiOne:", gpaForSemiOne);
  
  //////// Update the Year GPA to SUPABASE /////////
  // switch (currentYear.toString()) {
  //   case '1':
  //     await updateDegree({
  //       degreeId: degreeId,
  //       userId: user?.id,
  //       year1GPA: gpaForYear
  //     });
  //     break;
  //   case '2':
  //     await updateDegree({
  //       degreeId: degreeId,
  //       userId: user?.id,
  //       year2GPA: gpaForYear
  //     });
  //     break;
  //   case '3':
  //     await updateDegree({
  //       degreeId: degreeId,
  //       userId: user?.id,
  //       year3GPA: gpaForYear
  //     });
  //     break;
  //   case '4':
  //     await updateDegree({
  //       degreeId: degreeId,
  //       userId: user?.id,
  //       year4GPA: gpaForYear
  //     });
  // }
  ///////////???????????????????????????///////////

  ////////// Fetch YEARLY GPA from SUPABASE ///////////
  const { data: yearGPA, error:errorForYearGPA } = await supabase
    .from('degree')
    .select('degree_id, year1_gpa, year2_gpa, year3_gpa, year4_gpa')
    .match({ 
        degree_id: degreeId, 
        user_id: user?.id,
    });

  if (errorForYearGPA) {
    console.error('[ERROR_FETCHING_GPAS_FROM_DB]', errorForYearGPA);
  }
  
  ///////////// Calculate Overall GPA //////////////
  const overallGPA = calculateAverageGPA(yearGPA as any | null);
  

  return (
    <div className="overflow-y-auto">
      <h2 className="text-2xl md:text-3xl font-bold text-color-black py-6 md:py-8 px-4 md:px-10">
        Overall GPA : <span className="font-black text-gradient">{overallGPA.toFixed(2)}</span>
      </h2>
      <div className="px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {coursesForSemiOne.length !== 0 && (
            <div className="mt-6 mb-4 md:mb-6">
              <h2 className="text-color-violet text-lg font-medium">Semester 1</h2>
              <div className="mt-2 border border-slate-400/50 rounded-lg bg-white/50">
                <CourseTable 
                  courses={coursesForSemiOne} 
                  coursesFromDb={coursesFromDbForSemiOne}
                  degreeId={degreeId} 
                  slug={slug}
                  userId={userId}
                  gpa={gpaForSemiOne}
                />
              </div>
            </div>
          )}

          {coursesForSemiTwo.length !== 0 && (
            <div className={cn("mt-6 mb-4 md:mb-6")}>
              <h2 className="text-color-violet text-lg font-medium">Semester 2</h2>
              <div className="mt-2 border border-slate-400/50 rounded-lg bg-white/50">
                <CourseTable 
                  courses={coursesForSemiTwo} 
                  coursesFromDb={coursesFromDbForSemiTwo}
                  degreeId={degreeId} 
                  slug={slug}
                  userId={userId}
                  gpa={gpaForSemiTwo}
                />
              </div>
            </div>
          )}
        </div>

        {(coursesForSemiOne.length === 0 && coursesForSemiTwo.length === 0) && (
          <div className="p-4">
            <div className="w-full h-[400px] rounded-xl bg-white/30 flex flex-col justify-center items-center outline-dashed outline-1 outline-slate-400 outline-offset-1">
              <Image
                src='/emoji1.png'
                alt="cap"
                width={80}
                height={80}
                className=""
              />
              <p className="mt-2 text-base text-center text-gray-500">Courses not found!</p>
            </div>
          </div>
        )}

      </div>
    </div>
  )
}

export default DegreePage