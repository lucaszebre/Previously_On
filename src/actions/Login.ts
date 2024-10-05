'use server'


import betaseries from '@api/betaseries';
import { md5 } from 'js-md5';

export const login = async (
  email: string, 
  password: string, 
) => {

  try {
    betaseries.auth(process.env.NEXT_PUBLIC_BETASERIES_KEY as string);
    const p = md5(password);    
    const data =  await betaseries.postMembersAuth({password:p,login:email,})
    return data.data
  } catch (error) {
    
    console.error(error,'Error inside the login action')

    throw Error("Error with the login")
  }
};