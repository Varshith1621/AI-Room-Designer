"use client"
import { UserDetailContext } from '@/app/_context/UserDetailContext'
import { Button } from '@/components/ui/button'
import { UserButton } from '@clerk/clerk-react'
import Image from 'next/image'
import Link from 'next/link'
import React, { useContext } from 'react'

function Header() {
    const {userDetail,setUserDetail}=useContext(UserDetailContext);
  return (
    <div className='p-5 shadow-sm flex justify-between items-center'>
        <Link href={'/'} className='flex gap-2 items-center'>
            <Image src={'/logo.svg'} width={40} height={40} />
            <h2 className='font-bold text-lg'>AI Room Design</h2>
        </Link>

        <Link href={'/dashboard/buy-credits'}>
        <Button variant="ghost" className="rounded-full text-primary">Buy More Credits</Button>
        </Link>
       <div className='flex gap-7 items-center'>
           {userDetail?.credits&& <div className='flex gap-2 p-1 items-center bg-slate-200 px-3 rounded-full'>
                <Image src={'/star.png'} width={20} height={20}/>
                <h2>{userDetail?.credits}</h2>
            </div>}
            <UserButton/>
            <Link href={'/dashboard'}>
            <Button>Dashboard</Button>

        </Link>
        </div>
       
  
       
    </div>
  )
}

export default Header