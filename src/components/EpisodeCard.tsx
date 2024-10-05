import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image';
import Link from 'next/link';
import { EpisodeCardType } from '@/types';
import {  SquarePlus, SquareX } from 'lucide-react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addOneEpisode } from '@/actions/addOneEpisode';
import toast from 'react-hot-toast';
import { CopyPlus } from 'lucide-react';
import { removeOneEpisode } from '@/actions/removeOneEpisode';
import { addEpisodeUntil } from '@/actions/addEpisodeUntil';





const EpisodeCard: React.FC<EpisodeCardType> = ({title,image,id,serieId,episode,seen}) => {
  const queryClient = useQueryClient()
  const addEpisodeMutation = useMutation({
    mutationFn: async (id:string) => {
      const data = await addOneEpisode(id) 
      return data     
    },
    onSuccess: ()=>{
      queryClient.refetchQueries({queryKey: ['episode',serieId]});
      toast.success('Add Episode')
    },onSettled:()=>{
      queryClient.invalidateQueries({queryKey: ['episode',serieId]});

    }
  }) 
  
  const removeEpisodeMutation = useMutation({
    mutationFn: async (id:string) => {
      const data = await removeOneEpisode(id) 
      return data     
    },
    onSuccess: ()=>{
      queryClient.refetchQueries({queryKey: ['episode',serieId]});
      toast.success('Remove Episode')
    },onSettled:()=>{
      queryClient.invalidateQueries({queryKey: ['episode',serieId]});

    }
  }) 
  
  const addEpisodeUntilMutation = useMutation({
    mutationFn: async () => {
      const data = await addEpisodeUntil(id) 
      return data     
    },
    onSuccess: ()=>{
      queryClient.refetchQueries({queryKey: ['episode',serieId]});
      toast.success('Add all the episode')
    },onSettled:()=>{
      queryClient.invalidateQueries({queryKey: ['episode',serieId]});

    }
  }) 
  



  return (
      <Card className="w-full  relative  ">
        <CardHeader className='flex flex-col ' >
          
        <div className='flex items-center justify-end gap-4'>
          { !seen ?  <CopyPlus 
          className='cursor-pointer' 
          onClick={()=>{
              addEpisodeUntilMutation.mutate()
          }} 
          /> 
          :
          null
           }
         {
          !seen ? 
          <SquarePlus onClick={()=>{
              addEpisodeMutation.mutate(id)
          }} className='cursor-pointer'  />
          :
          <SquareX onClick={()=>{
            removeEpisodeMutation.mutate(id)
        }} className='cursor-pointer'  />
         }
          
        </div>
        <div className='flex flex-row items-center gap-4 justify-between w-full'>
        <CardTitle className="font-bold line-clamp-1 text-lg">
            {title}</CardTitle>
            <span>
               Episode {episode}
            </span>
        </div>
            
         
      
        </CardHeader>
          <CardContent className='flex flex-col gap-2'>
          <Link href={`/episode/${id}`}>

            <div className='h-[300px] cursor-pointer relative rounded-lg'>
              
              <Image src={image ? image : "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fdavidkoepp.com%2Fwp-content%2Fthemes%2Fblankslate%2Fimages%2FMovie%2520Placeholder.jpg&f=1&nofb=1&ipt=d96b7f4edbe00ce764c845764ea41c7ab46856b586b0b44f78c30bf61095433f&ipo=images"} alt={`Affiche de ${title}`}  fill />

            </div>
            </Link>

          </CardContent>
       
      </Card>
  
  );
};


export default EpisodeCard