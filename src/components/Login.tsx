"use client"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { LoginType, ResponseData, SchemaLogin } from "@/types"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Icons } from "./icons"
import React, {useContext, useState } from "react"
import { login } from "@/actions/Login"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import toast from "react-hot-toast"
import { useRouter } from "next/navigation"
import { DataContext } from "@/context/datacontext"
// import { DataContext } from '@/context/datacontext';

export function Login() {
  const [isLoading,setIsLoading] = useState(false)
   const { setUser  } =
   useContext(DataContext);
  const queryClient = useQueryClient()
  const router = useRouter()
  const LoginMutation  = useMutation({
    mutationFn: async (values:LoginType) => {
            setIsLoading(true)
           const data = await login(values.email,values.password) as ResponseData
           
          //  console.log(data,'inside the login.tsx')
           setUser(data)

            setIsLoading(false)
    },
    onError: () => {
        setIsLoading(false)
    toast.error('Error to register the user')
    },onSuccess:()=>{
      toast.success('Users connected')
      queryClient.invalidateQueries({ queryKey: [`users`] });
      router.replace('/')
    }}) 

  async function  onSubmit(values: z.infer<typeof SchemaLogin>) {
      setIsLoading(true)
      LoginMutation.mutate({password:values.password,email:values.email})
      setIsLoading(false)

  }

  const form = useForm<z.infer<typeof SchemaLogin>>({
    resolver: zodResolver(SchemaLogin),
    defaultValues: {
      email: "",
      password:""
      
    },
  })

  return (
    <>
    <Card className="p-4">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl ">Login an account</CardTitle>
        <CardDescription >
          Enter your email below to login your account
        </CardDescription>
      </CardHeader>
    <Form {...form} >
      <form  onSubmit={form.handleSubmit(onSubmit)} className="p-3 content-start items-start flex-col space-y-8">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="flex-col items-start content-start w-full">
              <FormLabel className="text-start w-full" >Email</FormLabel>
              <FormControl>
                <Input className="rounded-sm" placeholder="lucas1@gmail.com" {...field} />
              </FormControl>
              
              <FormMessage />
            </FormItem>
          )}
        /> 
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel className="text-start items-start w-full" >Password</FormLabel>
              <FormControl>
                <Input className="rounded-sm" type="password" placeholder="shadcn@dd11" {...field} />
              </FormControl>
              
              <FormMessage />
            </FormItem>
          )}
        />
        <Button   type="submit" className="w-full rounded-sm">{isLoading && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}Login</Button>
      </form>
    </Form>
    </Card>
    
</>
    
  )
}