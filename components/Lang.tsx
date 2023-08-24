import Link from 'next-intl/link'
import React from 'react'

export default function Lang() {
  return (
    <div className=' flex justify-end items-end pr-5  md:pr-0 mt-5'>
    <Link href="/" locale="en">
           EN
        </Link>{" "}
        |{" "}
        <Link href="/" locale="ka">
          GE
        </Link>
        
    </div>
  )
}
