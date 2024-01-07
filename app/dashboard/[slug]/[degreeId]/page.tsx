import { getCourses } from "@/sanity/actions";
import Image from "next/image";
import { currentUser } from "@clerk/nextjs";

import { cn } from "@/lib/utils";
import { updateDegree } from "@/actions/update-degree";
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

  // Fetch the courses for Semester 1
  const coursesForSemiOne = await getCourses({
    degreeId: degreeId,
    year: currentYear,
    semester: 1
  });

  // Fetch the courses for Semester 2
  const coursesForSemiTwo = await getCourses({
    degreeId: degreeId,
    year: currentYear,
    semester: 2
  });

  try {
    const res_create_degree = await updateDegree({
      degreeId: degreeId,
      userId: user?.id,
      slug: slug,
      firstname: user?.firstName
    })
  } catch (error) {
    console.error("DEGREE_CREATE_ERROR:", error);
  }

  return (
    <div className="overflow-y-auto">
      <h2 className="text-2xl md:text-3xl font-bold text-color-black py-6 md:py-8 px-4 md:px-10">
        Overall GPA : <span className="font-black text-gradient">3.79</span>
      </h2>
      <div className="px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {coursesForSemiOne.length !== 0 && (
            <div className="mt-6 mb-4 md:mb-6">
              <h2 className="text-color-violet text-lg font-medium">Semester 1</h2>
              <div className="mt-2 border border-slate-400/50 rounded-lg bg-white/50">
                <CourseTable 
                  courses={coursesForSemiOne} 
                  degreeId={degreeId} 
                  slug={slug} 
                  year={currentYear}
                  semester={1}
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
                  degreeId={degreeId} 
                  slug={slug}
                  year={currentYear} 
                  semester={2}
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