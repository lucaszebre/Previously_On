"use client"
import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuShortcut, DropdownMenuTrigger } from './ui/dropdown-menu'
import Link from 'next/link'
import { Button } from './ui/button'
import { getUserInfo } from '@/actions/getUserInfo'
import { useQuery } from '@tanstack/react-query'
import { ResponseData } from '@/types/menberInfo'
import { getFirstLetters } from '@/lib/utils'
import { House } from 'lucide-react';

const Header = () => {

    // const {setUser} = useContext(DataContext)

    const currentUser = useQuery({
        queryFn: async () => {
          const data = await getUserInfo() as ResponseData
          console.log(data,'inside the header')
          // setUser(data)
          return data  
        },
        queryKey: ['currentuser'],
        enabled: true,
      })

      console.log(currentUser.data)

  return (
    <nav className='flex justify-between w-full h-[3rem] border p-4 items-center my-3 rounded-xl '>
      <Link className='font-bold ' href='/'>
        <House />
      </Link>
    
<DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-8 w-8">
            <AvatarImage src={currentUser.data?.member.avatar? currentUser.data.member.avatar : "https://github.com/shadcn.png"} alt="@shadcn" />
            <AvatarFallback>{getFirstLetters(currentUser.data?.member.login ?currentUser.data?.member.login : "dee",currentUser.data?.member.login ? currentUser.data?.member.login : "de")}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 mt-3" align="end" >
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-xs leading-none text-muted-foreground">
              {currentUser.data?.member.login}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
       
          <Link href='/friends'>
            <DropdownMenuItem  className="cursor-pointer">
              Friends
              <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
            </DropdownMenuItem>
          </Link>
          
         
          
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        
        <DropdownMenuItem >
           Signout
          <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
          
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
      
    </nav>
  )
}

export default Header
