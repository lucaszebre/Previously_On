import React from 'react'
import axios from 'axios'
import { useQuery } from '@tanstack/react-query'
const DalymotionPlayer =  (url:{url:string}) => {

    const VideoData = useQuery({
        queryFn: async () => {
            const video = await axios.post(`https://www.dailymotion.com/services/oembed?url=h${url}`,{headers:{'Access-Control-Allow-Origin': '*',"Authorization":'Bearer 4a5090d9dc131624f35d'}})
          return video  
        },
        queryKey: ['allserie'],
        enabled: true,
      })
    
    

    console.log(VideoData.data)
  return (
    <div>
      
    </div>
  )
}

export default DalymotionPlayer
