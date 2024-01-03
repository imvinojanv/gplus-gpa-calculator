import './home.css';

import { getCourses, getDegrees, getUniversities } from "@/sanity/actions";

import HomeNavbar from './_components/home-navbar';
import Hero from './_components/hero';
import HomeFooter from './_components/home-footer';
import Universities from './_components/universities';
import Degrees from './_components/degrees';

interface HomePageProps {         // extract the title and categoryId from the url, (we didn't define the searchParams, It's come within Next.js)
  searchParams: {
    university: string;
  }
};

const HomePage = async ({ searchParams }: HomePageProps) => {

  const universities = await getUniversities();
  // console.log("UNIVERSITIES:", universities);

  const degrees = await getDegrees({
    type: 'university',
    slug: searchParams.university
  });
  // console.log("DEGREES:", degrees);
  
  // const courses = await getCourses({})
  // const courses = await getCourses({
  //   id: 'fd2179e9-813d-4cb4-9371-3ef239106bcf',
  // })
  // console.log("COURSES:", courses);
  
  // console.log("PARAMS:", searchParams.university);

  return (
    <section className='h-full w-full'>
      {/* <div className='mx-auto max-w-screen-xl'>
        <HomeNavbar />
      </div> */}
      <Hero />
      <div className='mx-auto max-w-screen-xl'>
        <div className='w-full px-4 flex flex-col items-start university-degree-list'>
            <h2 className='text-color-black font-medium'>Select your degree</h2>

            <div className='w-full mt-6 mx-auto grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 lg:gap-12'>
                <Universities universities={universities} />
                <Degrees degrees={degrees} slug={searchParams.university} />
            </div>
        </div>
      </div>
      <HomeFooter />
    </section>
  )
}

export default HomePage;