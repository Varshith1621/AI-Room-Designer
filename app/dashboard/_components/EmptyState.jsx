import { Button } from '@/components/ui/button'
import Link from "next/link";
import Image from 'next/image'
import React from 'react'

function EmptyState() {
  return (
    <div className='flex items-center justify-center mt-10 flex-col'>
      <Image src={'/placeholder.jpg'}
      width={200} height={200}
      />
      <h2 classname='font-medium text-lg text-gray-500'>Create New AI Interior Design for your room</h2>
      <Link href={'/dashboard/create-new'}>
       <Button className={"mt-5"}>+ Redesign Room</Button>
      </Link>
    </div>
  )
}

export default EmptyState