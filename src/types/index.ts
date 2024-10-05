import { z } from "zod";

/* eslint-disable @typescript-eslint/no-explicit-any */
export interface Movie {
    id:string;
    title: string;
    description: string;
    slug: string;
    original_title: string;
    seasons: string;
    sasons_details:any
    episodes:string;
    followers:string;
    comments:number;
    similars:string;
    characters:string;
    creation:string;
    showrunner?:string
    showrunners:string[],
    genres:any,
    length:string,
    network:string,
    country:string,
    rating:string,
    status:string,
    language:string,
    notes:any
    in_account:boolean
    images:any
    aliases:any
    social_links:any,
    user:any,
    next_trailer:string
    next_trailer_host:string
    resource_url:string
    platform:any
  }
  
  export interface MovieCardType {
    id:string;
    title: string;
    image:string
  }
  export interface EpisodeCardType {
    id:string;
    title: string;
    image:string
    episode:number
    serieId:string
    seen:boolean
    until: string[]
  } 
  
  export interface CharacterCardType {
    
    actor:string;
    personId:string;
    picture:string;
    name:string;
    guest:boolean;
    slug:string

  }

  export interface AllMovie {
    movies: Movie[],
    erros: any[]
  }



  export interface ImagesType {
    banner?: string,
    box?: string,
    poster?:string,
    show?:string
  } 
   export interface NotesType {
    total:number,
    mean:number,
    user:number
  }


  export const SchemaLogin = z.object({
    email: z.string().min(1,{ message: 'need a username' }),
    password: z.string().min(1, { message: 'at least 1 characters long' })
    ,
  });

  
  
  export const SchemaRegister = z.object({
    email: z.string().email().min(1,{ message: 'need a email' }),
    login: z.string().min(1,{ message: 'need a login' }),
    password: z.string().min(1, { message: 'at least 1 characters long' })
    ,
  });


export   type User = {
  id: number;
  login: string;
  xp: number;
  in_account: boolean;
};

export type ResponseData = {
  user: User;
  token: string;
  hash: string;
  errors: string[];
};


  export type RegisterType = z.infer<typeof SchemaRegister>;
  export type LoginType = z.infer<typeof SchemaLogin>;

  