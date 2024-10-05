"use client"

import { ResponseData } from '@/types';
import React, { createContext,  useEffect,  useState } from 'react';



export type DataContextType = {
 
    user:ResponseData, setUser:React.Dispatch<React.SetStateAction<ResponseData>>;
    code:string, setCode:React.Dispatch<React.SetStateAction<string>>;
};


export const DataContext = createContext<DataContextType>({} as DataContextType);



export const DataProvider = (props: { children: React.ReactNode }) => {

        
      

        const [user, setUser] = useState<ResponseData>(() => {
            if (typeof window !== 'undefined') {
              const savedUser = localStorage.getItem('user');
              return savedUser ? JSON.parse(savedUser) : {};
            }
            return {};
          });   
          
          const [code, setCode] = useState<string>(() => {
            if (typeof window !== 'undefined') {
              const saveCode = localStorage.getItem('code');
              return saveCode ? saveCode : '';
            }
            return '';
          });
        
          useEffect(() => {
            if (typeof window !== 'undefined') {
              localStorage.setItem('code', code);
            }
           
      
           
      
          }, [code]);

        
            
            

    return (
        <DataContext.Provider value={{
          code,setCode,
        user,setUser
        }}>{props.children}</DataContext.Provider>
    );
    };
