/* eslint-disable @typescript-eslint/no-explicit-any */
import { Description, Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import {  useState } from 'react'
import { Input } from './ui/input'
import {  useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { searchSeries } from '@/actions/searchSeries'
import { Button } from './ui/button'
import Image from 'next/image'
import { ScrollArea } from "@/components/ui/scroll-area"
import { addSeries } from '@/actions/addSeries'
import toast from 'react-hot-toast'

const AddSerie = () => {
  const [isOpen, setIsOpen] = useState(false)
    const [search,setSearch] =useState("")
    const [selectedSeries, setSelectedSeries] = useState<string[]>([])
    const queryClient = useQueryClient()
    const allSerie = useQuery({
        queryFn: async () => {
            const data = await searchSeries(search)  as any

            return data
        },
        queryKey: ['addserie',search],
        enabled: true,
      
      })
      
      const addSerieMutation = useMutation({
        mutationFn: async (Series:string[]) => {
          try {

            await addSeries(Series) 

            
          } catch (error) {
              console.log(error)
          }
        },
        onSuccess: ()=>{
          queryClient.invalidateQueries({ queryKey: ['allserie'] });
          toast.success('Sucessfully add series')
          
        }
      }) 

      const toggleSerieSelection = (serieId: string) => {
        setSelectedSeries((prevSelected) =>
          prevSelected.includes(serieId)
            ? prevSelected.filter((id) => id !== serieId)
            : [...prevSelected, serieId]
        )
      }


  return (
    <>
      <Button variant={'outline'} onClick={() => setIsOpen(true)}>Add series +</Button>
      <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-50">
        <div className="fixed inset-0 backdrop-blur-sm  flex w-screen items-center justify-center p-4">
          <DialogPanel className="max-w-xl h-[80%] flex justify-between flex-col space-y-4 border rounded-xl shadow-lg w-full	bg-background   p-12">
            <DialogTitle className="font-bold">Search a serie</DialogTitle>
            <Description>Found your serie, young padawan</Description>
            <Input placeholder='Type your movie my guys'  value={search} onChange={(e)=>{setSearch(e.target.value)}} />
            <ScrollArea className="h-[300px] w-full flex flex-col gap-4 p-5">
            {allSerie.isLoading ? (
                  <p>Loading ...</p>
                ) : allSerie.data && allSerie.data.shows.map((movie:any) => (

                  <label key={movie.id} className={'flex flex-row justify-between w-full items-center gap-3 my-8'}>
                
                 
                  <div className='flex flex-col gap-5 cursor-pointer'>
                    <div className='w-[10rem] h-[10rem] relative'>
                    <Image src={movie.poster||"https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fdavidkoepp.com%2Fwp-content%2Fthemes%2Fblankslate%2Fimages%2FMovie%2520Placeholder.jpg&f=1&nofb=1&ipt=d96b7f4edbe00ce764c845764ea41c7ab46856b586b0b44f78c30bf61095433f&ipo=images"}  alt={movie.title} fill />
                    </div>
                    <p className='font-bold text-2xl' key={movie.id}>
                      {movie.title}
                    </p>
                  </div>
    
                  <input
                  type="checkbox"
                  className='w-5 h-5'
                   checked={selectedSeries.includes(movie.id)}
                   onChange={() => toggleSerieSelection(movie.id)}
                  />
                  
                  </label>
                  
                  ))
            }       
              </ScrollArea>

            <Button onClick={()=>{
              addSerieMutation.mutate(selectedSeries)
              setSelectedSeries([])
            }}>Add Series</Button>
          </DialogPanel>
        
        </div>
      </Dialog>
    </>
  )
}


export default AddSerie
