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
import { RegisterType, SchemaRegister } from "@/types"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Icons } from "./icons"
import React, {  useState } from "react"
import toast from "react-hot-toast"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { register } from "@/actions/Register"
// import { useRouter } from "next/navigation"



export function Register() {
    const [isLoading,setIsLoading] = useState(false)

      const queryClient =useQueryClient()
      // const router = useRouter()

      const RegisterMutation  = useMutation({
        mutationFn: async (values:RegisterType) => {
                setIsLoading(true)
               const data = await register(values.login,values.password,values.email)
                setIsLoading(false)
                return data
        },
        onError: () => {
            setIsLoading(false)
        toast.error('Error to register the user')
        },onSuccess:()=>{
          toast.success('users registered')
          queryClient.invalidateQueries({ queryKey: [`users`] });
          // router.replace('/')
        }}) 

     
      
      function onSubmit(values: z.infer<typeof SchemaRegister>) {

          setIsLoading(true)
        
          RegisterMutation.mutate({password:values.password,email:values.email,login:values.login})
        
          setIsLoading(false)
      }

      const form = useForm<z.infer<typeof SchemaRegister>>({
        resolver: zodResolver(SchemaRegister),
        defaultValues: {
          email: "",
          
        },
      })
  return (
        
            <Card className="p-2">
        <CardHeader className="space-y-1">
            <CardTitle className="text-2xl ">Register an account</CardTitle>
            <CardDescription >
            Enter your email below to register your account
            </CardDescription>
        </CardHeader>
        <Form {...form} >
        <form  onSubmit={form.handleSubmit(onSubmit)} className="p-3 content-start items-start flex-col space-y-8">
            <FormField
            control={form.control}
            name="login"
            render={({ field }) => (
                <FormItem className="flex-col items-start content-start w-full">
                <FormLabel className="text-start w-full" >Login</FormLabel>
                <FormControl>
                    <Input placeholder="lucas" {...field} />
                </FormControl>
                
                <FormMessage />
                </FormItem>
            )}
            />   <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
                <FormItem className="flex-col items-start content-start w-full">
                <FormLabel className="text-start w-full" >Email</FormLabel>
                <FormControl>
                    <Input type="email"  placeholder="lucas1@gmail.com" {...field} />
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
                    <Input type="password" placeholder="shadcn@dd11" {...field} />
                </FormControl>
                
                <FormMessage />
                </FormItem>
            )}
            />
            <Button className="w-full"> {isLoading && (
                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}Register</Button>
        </form>
        </Form>
       
        </Card>
        
        
    )
}
