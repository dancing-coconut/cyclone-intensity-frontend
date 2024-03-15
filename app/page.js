'use client'
 
import { useRouter } from 'next/navigation'
export default function Home(){
    const router = useRouter()

    return(
        <div className="bg-black flex flex-col justify-center p-6 h-screen w-screen">
            <div className="text-white font-extrabold text-7xl ml-10">Cyclone<br />Intensity<br />Prediction<br /></div>
            <div>
                <button 
                    className="text-white border border-white rounded-md p-2 w-48 ml-10 mt-10 mr-6 hover:bg-white hover:text-zinc-900 transition ease-in-out delay-150"
                    onClick={() => router.push('/admin')}
                >REAL - TIME</button>
                <button 
                    className="text-white border border-white rounded-md p-2 w-48 mt-10 mr-4 hover:bg-white hover:text-zinc-900 transition ease-in-out delay-150"
                    onClick={() => router.push('/time-series')}
                >TIME SERIES</button>
            </div>
        </div>
    );
}