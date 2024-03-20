'use client'
 
import { useEffect, useState } from 'react'
import { useRouter, redirect, push } from 'next/navigation'
import { useSession } from "next-auth/react"

export default function Custom404() {
    const router = useRouter()

    const { data: session } = useSession()

    // useEffect(() => {
    //     if (session) {
            
    //     } else {
    //         router.push('/')
    //     }
    // }, [])
    
    if (session) {
        return(
            <div className='w-screen h-screen bg-black flex flex-col items-center justify-center'>
                <div className='text-white w-56 text-2xl'>
                    Looks like the page you were looking for doesn't exist! Feel free to browse for something else!
                </div>
            </div>
        );
    } else {
        return (
            <div className='w-screen h-screen bg-black flex flex-col items-center justify-center'>
                <div className='text-white w-72'>
                {/* {useEffect(() => {
                    if (!session) {
                        router.push('/')
                    }
                }, [])} */}
                </div>
            </div>
        )
    }
}