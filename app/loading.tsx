import Image from 'next/image'
import React from 'react'

const Loading = () => {
  return (
    <div className='w-full h-screen flex justify-center items-center'>
        <Image
            src='/loading.svg'
            alt=""
            width={130}
            height={130}
            className='max-md:w-28 max-md:h-28'
        />
    </div>
  )
}

export default Loading