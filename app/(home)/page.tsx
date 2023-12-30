import Image from 'next/image'
import Link from 'next/link'

import { getCourses, getDegrees, getUniversities } from "@/sanity/actions";

import { Button } from '@/components/ui/button'

const HomePage = async () => {

  // const universities = await getUniversities();
  // console.log("UNIVERSITIES:", universities);

  // const degrees = await getDegrees({
  //   type: 'university',
  //   slug: 'uok'
  // });
  // console.log("DEGREES:", degrees);
  
  // const courses = await getCourses({})
  // const courses = await getCourses({
  //   id: 'fd2179e9-813d-4cb4-9371-3ef239106bcf',
  // })
  // console.log("COURSES:", courses);

  return (
    <main>
      Home Page
      <Link href='/sign-in'>
        <Button variant='destructive'>Sign In</Button>
      </Link>
    </main>
  )
}

export default HomePage;