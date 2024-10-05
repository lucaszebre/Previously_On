/* eslint-disable @typescript-eslint/no-explicit-any */
'use server'


import betaseries from '@api/betaseries';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export const auth = async () => {
    const cookieStore = cookies()
    betaseries.auth('b510be640b15');
    const data =  await betaseries.postMembersOauth({client_id:'b510be640b15'}) as any
    
    cookieStore.set('redirect_uri','http://127.0.0.1:3000/')
    cookieStore.set('client_id','b510be640b15')
    cookieStore.set('client_secret','8ca25dcd1eecc5672ffcaa3e2c3bea21')

    redirect(`${data.data.oauth.callback}?redirect_uri=http://127.0.0.1:3000/&&client_id=b510be640b15`)
    

};