import { Calendar, Clock, Tag, X } from "lucide-react";
import { Button } from "../../components/button";
import { FormEvent } from "react";
import { api } from "../../lib/axios";
import { useNavigate, useParams } from "react-router-dom";

interface CreateActivityModalProps {
    closeCreateActivityModal : () => void
}

export function CreateActivityModal ( {closeCreateActivityModal } : CreateActivityModalProps){
    const {tripId} = useParams()
    async function createActivity ( event: FormEvent<HTMLFormElement>){
        event.preventDefault()

        const data = new FormData(event.currentTarget)

        const title = data.get('title')?.toString()
        const date = data.get('date')?.toString()
        const time = data.get('time')?.toString()
        if (!date || !time){
            return
        }

        const dateAndTime = `${date} ${time}`

        await api.post(`/trips/${tripId}/activities`, {
            title: title?.toString(),
            date: dateAndTime.toString()
        })
          window.document.location.reload()  
    }
    
    return (
        <div className='fixed inset-0 bg-black/60 flex items-center p-0 justify-center'>
                <div className='w-[640px] rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5'>
                    <div>
                    <div className='flex items-center justify-between'>
                        <h2 className='font-semibold text-lg'>Cadastrar atividade</h2>
                        <button type='button' className='hover:bg-zinc-800 rounded-full p-1' onClick={closeCreateActivityModal}>
                        <X className='size-5 text-stone-400' />
                        </button>
                    </div>
                    <p className='text-sm text-stone-400 mt-2'>
                        Todos os convidados podem visualizar as atividades.
                    </p>
                    </div>


                    <form onSubmit={createActivity} action="" className='space-y-3'>
                    <div className='h-14 px-5 flex items-center flex-1 gap-2  bg-stone-950 rounded-lg border-stone-300'>
                        <Tag className='size-5 text-stone-500'/>
                        <input
                        type="text" 
                        name='title' 
                        placeholder='Qual a atividade?' 
                        className='bg-transparent text-lg placeholder-stone-400 outline-none flex-1'  
                        />
                    </div>
                    <div className="flex items-center gap-4">
                        <div className='h-14 px-5 flex items-center flex-1 gap-2  bg-stone-950 rounded-lg border-stone-300'>
                            <Calendar className='size-5 text-stone-500'/>
                            <input 
                            type="date" 
                            name='date' 
                            className='bg-transparent text-lg text-stone-400 outline-none flex-1'  />
                        </div>
                        <div className='h-14 w-40 px-5 flex items-center gap-2  bg-stone-950 rounded-lg border-stone-300'>
                            <Clock className='size-5 text-stone-500'/>
                            <input 
                            type="time" 
                            name='time' 
                            placeholder='Horário' 
                            className='bg-transparent text-lg text-stone-400 outline-none flex-1'/>
                        </div>
                    </div>
                        


                    <Button size="full">
                        Salvar atividade
                    </Button>
                    </form>
                </div>
            </div>
    )
}