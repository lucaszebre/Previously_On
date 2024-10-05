import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {  MovieCardType } from '@/types';
import Image from 'next/image';
import Link from 'next/link';





const SerieCard: React.FC<MovieCardType> = ({title,image,id }) => {

  return (
      <Card className="w-full  relative  ">
        <CardHeader className='flex flex-row items-center justify-between w-full'>
          <CardTitle className="font-bold text-lg">
            {title}</CardTitle>
         
      
        </CardHeader>
        <Link href={`serie/${id}`}>
          <CardContent className='flex flex-col gap-2'>

            <div className='h-[300px] cursor-pointer relative rounded-lg'>
              
              <Image src={image ? image : "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fdavidkoepp.com%2Fwp-content%2Fthemes%2Fblankslate%2Fimages%2FMovie%2520Placeholder.jpg&f=1&nofb=1&ipt=d96b7f4edbe00ce764c845764ea41c7ab46856b586b0b44f78c30bf61095433f&ipo=images"} alt={`Affiche de ${title}`}  fill />

            </div>

            {/* <p className="text-sm mb-2">Catégorie : {category}</p>
            <div className="relative h-2 bg-gray-200 rounded">
              <div
                className="absolute top-0 left-0 h-2 bg-green-500 rounded"
                style={{ width: `${likeRatio}%` }}
              ></div>
            </div> */}
            
          </CardContent>
        </Link>

      </Card>
  
  );
};


export default SerieCard