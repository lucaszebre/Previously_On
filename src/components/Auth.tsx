"use client"
// import { useState } from 'react'
import React, { useState } from 'react';
import Link from 'next/link';
import { Button } from './ui/button';
import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { auth } from '@/actions/auth';
import { Icons } from './icons';

function Auth() {

  const [isLoading,setIsLoading] = useState(false)

  const LoginMutation  = useMutation({
    mutationFn: async () => {

      try {
          setIsLoading(true)
           const data = await auth() 
           
          console.log(data,'inside the login.tsx')

          setIsLoading(false)
        
      } catch (error) {
        
      }
            
    },
    onError: () => {
        setIsLoading(false)
    toast.error('Error to register the user')
    },onSuccess:()=>{
      toast.success('Users connected')
    }}) 



  return (
    
   

    <div className=" relative  w-full h-screen flex col content-center items-center justify-center ">
      
      <div className="relative w-full  h-full flex-col  p-10 text-white dark:border-r  ">
       
      <div className="relative z-20 hidden items-center text-lg font-medium md:flex">
          <Link href='/'>
              <h1 className='text-white font-extrabold text-2xl'>
                Previously_On
              </h1>
                    </Link>
          
        </div>
      <div className="lg:p-8">
        <div className="mx-auto flex w-full flex-row justify-center space-y-6 sm:w-[350px]">
        
        {/* <Tabs defaultValue="register" className="max-w-[400px]">
  <TabsList>
    <TabsTrigger className='' value="login">Login</TabsTrigger>
    <TabsTrigger value="register">Register</TabsTrigger>
  </TabsList>
  <TabsContent value="login"><Login /></TabsContent>
  <TabsContent value="register"><Register /></TabsContent>
</Tabs> */}

<Button onClick={()=>{
  LoginMutation.mutate()
}}>
  {isLoading && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
  Signin
</Button>
          
        </div>
      </div>
    </div>
    </div>

    
    
  )
}

export default Auth