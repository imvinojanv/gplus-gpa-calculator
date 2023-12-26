import Image from 'next/image'
import Link from 'next/link'

import { getDegrees, getUniversities } from "@/sanity/actions";

import { Button } from '@/components/ui/button'

const HomePage = async () => {

  const universities = await getUniversities();
  const degrees = await getDegrees({
    type: 'university',
    slug: 'uok'
  });
  // console.log("UNIVERSITIES:", universities);
  console.log("DEGREES:", degrees[0].degrees[0]);

  // try {
  //   const degrees = await getDegrees({
  //     type: 'university',
  //     slug: 'uok'
  //   });
  //   console.log("DEGREES:", degrees[0].degrees[0]);
  // } catch (error) {
  //   console.log("[FETCH_DEGREES_ERROR]", error);
  // }

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