import { Button } from '@/components/ui/button'
import Image from 'next/image'
import Link from 'next/link'

export default function HomePage() {
  return (
    <main>
      Home Page
      <Link href='/sign-in'>
        <Button variant='destructive'>Sign In</Button>
      </Link>
    </main>
  )
}
