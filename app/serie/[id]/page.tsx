/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import { getOneSeries } from '@/actions/getOneSerie'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { useQuery } from '@tanstack/react-query'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { MoveLeft, Star } from 'lucide-react';
import { getSerieEpisode } from '@/actions/getSerieEpisode'
import EpisodeCard from '@/components/EpisodeCard'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import DisplayVideo from '@/components/displayVideo'

const Page = ({ params }: { params: { id: string } }) => {
    const router = useRouter()
    const [season,setSeason] = useState(1)
    const [seen,setSeen] = useState("notseen")
    const Serie = useQuery({
        queryFn: async () => {
          const data = await getOneSeries(params.id)
          return data  as any
        },
        queryKey: ['serie',params.id],
        enabled: true,
      })   
      
      const AllEpisode = useQuery({
        queryFn: async () => {
          const data = await getSerieEpisode(params.id)
          return data  as any
        },
        queryKey: ['allepisode',params.id],
        staleTime:1,
        enabled: true,
      })

      

      if(Serie.isLoading || AllEpisode.isLoading){
        return (
            <div className='w-full h-full flex justify-center text-center items-center'>
                 <p className='font-bold text-center text-white '>
            Loading...
        </p>
            </div>
        )
       
      }


    
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
            <Image className='rounded-xl' fill src={Serie.data.show.images.poster ||  "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fdavidkoepp.com%2Fwp-content%2Fthemes%2Fblankslate%2Fimages%2FMovie%2520Placeholder.jpg&f=1&nofb=1&ipt=d96b7f4edbe00ce764c845764ea41c7ab46856b586b0b44f78c30bf61095433f&ipo=images"}  alt={Serie.data.show.slug} />
        </div>
        <Card className='flex flex-col p-4 justify-start gap-4'>
            <span className='text-white font-bold text-xl'>
               Title : {Serie.data.show.original_title}
            </span>  
            <p className='text-white  text-lg'>
               Description : {Serie.data.show.description}
            </p> 
             <span className='text-white  text-xl'>
               Season : {Serie.data.show.seasons}
            </span>  
            <span className='text-white   text-xl'>
                Episode : {Serie.data.show.episodes}
            </span> 
           
            <div className='flex gap-4 items-center:'>
            <span className='text-white  text-xl'>
                Notes : 
            </span>
                <Star color="#fafe01" />
                {Math.round(Serie.data.show.notes.mean) }
            </div> 
            <div className='flex gap-4'>
                <span>
                    Genres :
                </span>
                <div className='md:flex gap-4 items-center grid sm:grid-cols-2 grid-cols-1 '>
                {Array.from(Object.keys(Serie.data.show.genres)).map((genre:any,index)=>{
                    return (
                        <Button
                        variant={'outline'}
                         key={index}>
                                {genre}
                        </Button>
                    )
            })

                }
                </div>
         
            </div>
            
            <Button className='w-[6rem]' variant={'default'}>
                Archiver
            </Button>

        </Card>
      
        </div>
        <DisplayVideo id={params.id} />

        <Card className='flex justify-center p-4'>
                <div className=' items-center gap-4 lg:grid-cols-8 sm:grid-cols-5  grid grid-cols-3 '>
                    {Serie.data.show.seasons_details.map((seasoned:any)=>{
                              console.log(season ==seasoned.number ? 'bg-foreground text-black' :'','all the episode')

                        return (
                            <Button
                            className={`${season ==seasoned.number? 'bg-foreground text-black' :''}`}
                            onClick={()=>{
                                setSeason(seasoned.number)
                            }} 
                             variant={'outline'} key={seasoned.number}>
                                  season {seasoned.number}
                            </Button>
                        )
                    })}
                </div>
            </Card>   

            
             <Card className='flex flex-col gap-4 justify-center p-4'>
                <span className='text-white font-bold'>
                    Season {season}
                </span>
            <div className='flex justify-start'>
            <Select onValueChange={setSeen} value={seen} >
                <SelectTrigger  className="w-[180px]">
                    <SelectValue placeholder="Watched :" />
                </SelectTrigger>
                <SelectContent >
                    <SelectItem value="seen">Seen</SelectItem>
                    <SelectItem value="notseen">Not Seen</SelectItem>
                </SelectContent>
            </Select>
            </div>
    
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
  {AllEpisode.data && AllEpisode.data.episodes ? (
    AllEpisode.data.episodes
      .filter((episode:any) => {
        if (episode.season !== season) return false;

        if (seen === 'seen') {
          return episode.user.seen;
        } else if (seen === 'notseen') {
          return !episode.user.seen;
        }

        return true;
      })
      .map((episode:any) => {


        const until =  AllEpisode.data.episodes
        .filter((episode:any) => {
          if (episode.season !== season) return false;
  
          if (seen === 'seen') {
            return episode.user.seen;
          } else if (seen === 'notseen') {
            return !episode.user.seen;
          }
  
          return true;
        }).filter((epi:any)=>{
          return epi.episode < episode.episode
        })
        return (
        <EpisodeCard
          key={episode.id}
          image={
            Serie.data.show.images.poster ||
            "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fdavidkoepp.com%2Fwp-content%2Fthemes%2Fblankslate%2Fimages%2FMovie%2520Placeholder.jpg&f=1&nofb=1&ipt=d96b7f4edbe00ce764c845764ea41c7ab46856b586b0b44f78c30bf61095433f&ipo=images"
          }
          title={episode.title}
          id={episode.id}
          episode={episode.episode}
          serieId={params.id}
          seen={episode.user.seen}
          until={until}
        />
      )
      } )
  ) : (
    <p>No episodes available.</p>
  )}
</div>

            </Card>
    </div>



  )
}

export default Page
