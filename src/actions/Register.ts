'use server'

/* eslint-disable @typescript-eslint/no-explicit-any */
// import Cookies from 'js-cookie';
import betaseries from '@api/betaseries';

export const register = async (
  login: string, 
  password: string,
  email:string, 
) => {

  try {
    
    betaseries.auth('b510be640b15');

 const data = await    betaseries.postMembersSignup({login,password,email})

    if(data.data)
 return data.data

  } catch (error:any) {

    console.log(error)
   
    throw Error("Error with registering")
  }
};