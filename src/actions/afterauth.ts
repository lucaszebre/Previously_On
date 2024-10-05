/* eslint-disable @typescript-eslint/no-explicit-any */
'use server'


import betaseries from '@api/betaseries';
import { cookies } from 'next/headers';

export const afterauth = async (code:string) => {
    const cookieStore = cookies()
    const redirect_uri = cookieStore.get('redirect_uri')?.value;
    const client_id = cookieStore.get('client_id')?.value;
    const client_secret = cookieStore.get('client_secret')?.value;
 
    if(code && redirect_uri && client_id && client_secret){
        betaseries.auth(process.env.NEXT_PUBLIC_BETASERIES_KEY as string);

        const data = await betaseries.postOauthAccessToken({code,redirect_uri,client_id,client_secret}) as any
        // console.log(data.data,'in the after auth')
        // console.log(data.data.access_token,'acces_token')
        cookieStore.set('access_token',data.data.access_token)
        return data.data
    }
    
   
    

};