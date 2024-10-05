'use server'

import axios from 'axios';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function getOneSeries(id:string) {
  const cookiesStore = cookies()
  const access_token = cookiesStore.get('access_token')?.value

  if(access_token && id){



   const data = await  axios.get('https://api.betaseries.com/shows/display',{data:{id},headers:{"X-BetaSeries-Key":'b510be640b15',"X-BetaSeries-Token":access_token}})
        // console.log(series,"inside the GetSeries")
    return data.data 

  }else{
    redirect('/auth')
  }
    


    
 
}