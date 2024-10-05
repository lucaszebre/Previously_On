'use server'

import axios from 'axios';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function getSeriesVideo(id:string) {
  const cookiesStore = cookies()
  const access_token = cookiesStore.get('access_token')?.value

  if(access_token){



   const data = await  axios.get('https://api.betaseries.com/shows/videos',{data:{id},headers:{"X-BetaSeries-Key": process.env.NEXT_PUBLIC_BETASERIES_KEY,"X-BetaSeries-Token":access_token}})
    return data.data 

  }else{
    redirect('/auth')
  }
    


    
 
}