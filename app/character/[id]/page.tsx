/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { useQuery } from '@tanstack/react-query'
import Image from 'next/image'
import { useRouter,  } from 'next/navigation'
import React from 'react'
import { MoveLeft,  } from 'lucide-react';
import SerieCard from '@/components/SerieCard'
import { getDetailsCharacter } from '@/actions/getDetailsCharacter'

const Page = ({ params }: { params: { id: string } }) => {
    const router = useRouter()
    // const [seen,setSeen] = useState("notseen")

    const Character = useQuery({
        queryFn: async () => {
          const data = await getDetailsCharacter(params.id)
          return data as any
        },
        queryKey: ['characterdetails',params.id],
        enabled: true,
      })   
      
   
      

      if(Character.isLoading){
        return (
            <div className='w-full h-full flex justify-center text-center items-center'>
                 <p className='font-bold text-center text-white '>
            Loading...
        </p>
            </div>
        )
       
      }

      console.log(Character.data,'characters')


    
  return (
    <div className='flex flex-col py-8 gap-10'>
        <div className='w-full flex  justify-start'>
            <Button className='w-[7rem] flex gap-4'  variant={'outline'} onClick={()=>{
                router.back()
            }} >
             <MoveLeft />   Back  
            </Button>
        </div>
      
            <div className='flex flex-col  lg:flex-row gap-9 w-full '>
        <div className=' h-[30rem] w-full lg:w-[50rem] relative'>
            <Image className='rounded-xl' fill src={Character.data.person.poster ||  "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fdavidkoepp.com%2Fwp-content%2Fthemes%2Fblankslate%2Fimages%2FMovie%2520Placeholder.jpg&f=1&nofb=1&ipt=d96b7f4edbe00ce764c845764ea41c7ab46856b586b0b44f78c30bf61095433f&ipo=images"}  alt={Character.data.person.name} />
        </div>
        <Card className='flex flex-col p-4 justify-start gap-4'>
            <span className='text-white font-bold text-xl'>
               Name : {Character.data.person.name}
            </span> 
            <span className='text-white  text-xl'>
              Nationality : {Character.data.person.nationality}
            </span> 
            <span className='text-white  text-xl'>
              Birthday : {Character.data.person.birthday}
            </span>   
            <p className='text-white  text-lg'>
               Description : {Character.data.person.description}
            </p> 
         
           
           
          
            
            
         
            
           

        </Card>
      
       
       

    </div>
    <Card className='flex flex-col gap-4 justify-center p-4'>
                <span className='text-white font-bold'>
                    Shows
                </span>
            
    
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
  {Character.data.person.shows && Character.data.person.shows? (
    Character.data.person.shows
      .map((serie:any,index:number) => {

        console.log(serie)
    
        return (
        <SerieCard
        key={index}
            image={serie.show.poster}
            {...serie.show}
         
        />
      )
      } )
  ) : (
    null
  )}
</div>

            </Card>
    </div>



  )
}

export default Page
