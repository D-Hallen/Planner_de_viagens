import { Link2, Tag, X } from "lucide-react";
import { Button } from "../../components/button";
import { useParams } from "react-router-dom";
import { FormEvent } from "react";
import { api } from "../../lib/axios";

interface CreateLinkModalProps {
    closeCreateLinkModal : () => void
}

export function CreateLinkModal ( {closeCreateLinkModal } : CreateLinkModalProps){
    const {tripId} = useParams()
    async function createLink ( event: FormEvent<HTMLFormElement>){
        event.preventDefault()

        const data = new FormData(event.currentTarget)

        const title = data.get('title')?.toString()
        const url = data.get('url')?.toString()

        if (!title || !url){
            return
        }

        await api.post(`/trips/${tripId}/links`, {
            title: title?.toString(),
            url: url?.toString()
        })
          window.document.location.reload()  
    }


    return (
        <div className='fixed inset-0 bg-black/60 flex items-center justify-center'>
                <div className='w-[640px] rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5'>
                    <div>
                    <div className='flex items-center justify-between'>
                        <h2 className='font-semibold text-lg'>Cadastrar link</h2>
                        <button type='button' className='hover:bg-zinc-800 rounded-full p-1' onClick={closeCreateLinkModal}>
                        <X className='size-5 text-stone-400' />
                        </button>
                    </div>
                    <p className='text-sm text-stone-400 mt-2'>
                        Todos os convidados podem visualizar os links importantes.
                    </p>
                    </div>


                    <form  onSubmit={createLink} className='space-y-3'>
                    <div className='h-14 px-5 flex items-center flex-1 gap-2  bg-stone-950 rounded-lg border-stone-300'>
                        <Tag className='size-5 text-stone-500'/>
                        <input
                            type="text" 
                            name='title' 
                            placeholder='Título do Link' 
                            className='bg-transparent text-lg placeholder-stone-400 outline-none flex-1'  
                        />
                    </div>
                    <div className="flex items-center gap-4">
                        <div className='h-14 px-5 flex items-center flex-1 gap-2  bg-stone-950 rounded-lg border-stone-300'>
                            <Link2 className='size-5 text-stone-500'/>
                            <input 
                            type="url" 
                            name='url' 
                            placeholder='URL' 
                            className='bg-transparent text-lg text-stone-400 outline-none flex-1'  />
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