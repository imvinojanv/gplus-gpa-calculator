import { getCourses, getDegrees, getUniversities } from "@/sanity/actions";

import CourseTable from "@/components/course-table";
import { Button } from "@/components/ui/button";

const DegreePage = async ({
  params
}: {
  params: { slug: string; degreeId: string }
}) => {

  // Fetch the course details
  const courses = await getCourses({
    id: params.degreeId
  });
  console.log("COURSES:",courses);

  const degrees = await getDegrees({
    type: 'university',
    slug: 'uok'
  });
  console.log("DEGREES:", JSON.stringify(degrees));

  return (
    <div className="overflow-y-auto">
      <h2 className="text-2xl md:text-3xl font-bold text-color-black py-6 md:py-8 px-4 md:px-10">
        Overall GPA : <span className="font-black text-gradient">3.79</span>
      </h2>
      <div className="px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="mt-6 mb-4 md:mb-6">
            <h2 className="text-color-violet text-lg font-medium">Semester 1</h2>
            <div className="mt-2 border border-slate-400/50 rounded-lg bg-white/50">
              <CourseTable />
            </div>
          </div>

          <div className="mt-6 mb-4 md:mb-6">
            <h2 className="text-color-violet text-lg font-medium">Semester 2</h2>
            <div className="mt-2 border border-slate-400/50 rounded-lg bg-white/50">
              <CourseTable />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DegreePage