import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image';
import { CharacterCardType } from '@/types';
import Link from 'next/link';





const CharacterCard: React.FC<CharacterCardType> = ({picture,name,personId}) => {
 
  



  return (
    <Link href={`/character/${personId}`}>
        <Card className="w-full  relative  ">
          <CardHeader className='flex flex-col ' >
            
          
          <div className='flex flex-row items-center gap-4 justify-between w-full'>
          <CardTitle className="font-bold line-clamp-1 text-lg">
              {name}</CardTitle>
              
          </div>
              
          
        
          </CardHeader>
            <CardContent className='flex flex-col gap-2'>

              <div className='h-[300px] cursor-pointer relative rounded-lg'>
                
                <Image src={picture ? picture : "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.pngall.com%2Fwp-content%2Fuploads%2F12%2FAvatar-PNG-Image.png&f=1&nofb=1&ipt=a70588a585f2acd9cf049ea9968c8636dfb3300640fbace70b459688e93ccd59&ipo=images"} alt={`Affiche de ${name}`}  fill />

              </div>

            </CardContent>
        
        </Card>
      </Link>

  
  );
};


export default CharacterCard