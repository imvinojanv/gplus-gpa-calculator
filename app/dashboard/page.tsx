import { Button } from "@/components/ui/button";
import { getCourses, getDegrees, getUniversities } from "@/sanity/actions";

const DashboardPage = async () => {

  try {
    const universities = await getUniversities();
    console.log("UNIVERSITIES:",universities);
  } catch (error) {
      console.log("[FETCH_UNIVERSITIES_ERROR]", error);
  }

  try {
    const degrees = await getDegrees({
      type: 'university',
      slug: 'uok'
    });
    console.log("DEGREES:",degrees[0].degrees[0]);
  } catch (error) {
      console.log("[FETCH_DEGREES_ERROR]", error);
  }

  try {
    const courses = await getCourses({
      id: '5b344ea0-5e78-46cb-9a1a-3a617860469d'
    });
    console.log("COURSES:",courses);
  } catch (error) {
      console.log("[FETCH_COURSES_ERROR]", error);
  }

  return (
    <div className="overflow-y-auto">
      <h2 className="text-2xl md:text-3xl font-bold text-color-black py-6 md:py-8 px-4 md:px-10">
        Overall GPA : <span className="font-black text-gradient">3.79</span>
      </h2>
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h2 className="text-color-violet text-lg font-medium">Semester 1</h2>
            <div className="mt-2">
              Table 1
            </div>
          </div>

          <div>
            <h2 className="text-color-violet text-lg font-medium">Semester 2</h2>
            <div className="mt-2">
              Table 2
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DashboardPage