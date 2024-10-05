/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { useQuery } from '@tanstack/react-query'
import Image from 'next/image'
import { useRouter, useSearchParams } from 'next/navigation'
import React from 'react'
import { MoveLeft, Star } from 'lucide-react';
import { getOneEpisode } from '@/actions/getOneEpisode'
import CharacterCard from '@/components/CharacterCard'
import DisplayComments from '@/components/displayComments'

const Page = ({ params }: { params: { id: string } }) => {
    const router = useRouter()
    // const [seen,setSeen] = useState("notseen")
    const search = useSearchParams()

    const url = search.get("url")
    const Episode = useQuery({
        queryFn: async () => {
          const data = await getOneEpisode(params.id)
          return data as any
        },
        queryKey: ['episodedetails',params.id],
        enabled: true,
      })   
      
   
      

      if(Episode.isLoading){
        return (
            <div className='w-full h-full flex justify-center text-center items-center'>
                 <p className='font-bold text-center text-white '>
            Loading...
        </p>
            </div>
        )
       
      }

      console.log(Episode.data.episode.characters,'characters')


    
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
            <Image className='rounded-xl' fill src={url ||  "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fdavidkoepp.com%2Fwp-content%2Fthemes%2Fblankslate%2Fimages%2FMovie%2520Placeholder.jpg&f=1&nofb=1&ipt=d96b7f4edbe00ce764c845764ea41c7ab46856b586b0b44f78c30bf61095433f&ipo=images"}  alt={Episode.data.episode.title} />
        </div>
        <Card className='flex flex-col p-4 justify-start gap-4'>
            <span className='text-white font-bold text-xl'>
               Title : {Episode.data.episode.title}
            </span> 
            <span className='text-white  text-xl'>
              {Episode.data.episode.code}
            </span>   
            <p className='text-white  text-lg'>
               Description : {Episode.data.episode.description}
            </p> 
         
           
           
            <div className='flex gap-4 items-center:'>
            <span className='text-white  text-xl'>
                Notes : 
            </span>
                <Star color="#fafe01" />
                {Math.round(Episode.data.episode.note.mean) }
            </div> 
            
         
            
            <Button className='w-[6rem]' variant={'default'}>
                Archiver
            </Button>

        </Card>
      
        </div>
       
        <Card className='flex flex-col gap-4 justify-center p-4'>
                <span className='text-white font-bold'>
                    Characters
                </span>
            
    
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
  {Episode.data.episode && Episode.data.episode.characters ? (
    Episode.data.episode.characters
      .map((user:any) => {


    
        return (
        <CharacterCard
        key={user.id}
        {...user}
         
        />
      )
      } )
  ) : (
    null
  )}
</div>

            </Card>

            <DisplayComments id={params.id} />
    </div>



  )
}

export default Page
