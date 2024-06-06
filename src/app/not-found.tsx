import * as React from 'react'
import Link from 'next/link'

const ErrorPage = () => {
  return (
    <section className='w-full h-[70vh] flex flex-col justify-center items-center gap-4'>
      <div className='text-3xl font-bold'>404 | Page Not Found</div>
      <Link href={'/'} className='text-blue-500'>Back to home</Link>
    </section>
  )
}

export default ErrorPage