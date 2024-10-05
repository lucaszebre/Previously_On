'use server'

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import axios from 'axios'
export async function getUserInfo() {
  const cookiesStore = cookies()
  const access_token = cookiesStore.get('access_token')?.value
 
  

    if(access_token){    

      const data = await  axios.get('https://api.betaseries.com/members/infos',{headers:{"X-BetaSeries-Key":'b510be640b15',"X-BetaSeries-Token":access_token}})
      
        return data.data

    }else{
      redirect('/auth')
    }
    


    
 
}