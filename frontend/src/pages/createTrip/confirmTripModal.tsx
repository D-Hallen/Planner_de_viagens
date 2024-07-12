import { Mail, UserRound, X } from "lucide-react";
import { FormEvent } from "react";
import { Button } from "../../components/button";
import { DateRange } from "react-day-picker";

interface ConfirmTripModalProps {
    closeConfirmSetModal: () => void,
    createTrip: (event: FormEvent<HTMLFormElement>) => void,
    setOwnerName: (name: string) => void,
    setOwnerEmail : (email: string) => void,
    destination: string,
    eventDates: DateRange | undefined
}

export function ConfirmTripModal ({
    closeConfirmSetModal,
    createTrip,
    setOwnerEmail,
    setOwnerName,
    destination,
    eventDates
} : ConfirmTripModalProps){
    return(
        <div className='fixed inset-0 bg-black/60 flex items-center justify-center'>
      <div className='w-[640px] rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5'>
        <div>
          <div className='flex items-center justify-between'>
            <h2 className='font-semibold text-lg'>Confirmar criação da viagem</h2>
            <button type='button' className='hover:bg-zinc-800 rounded-full p-1' onClick={closeConfirmSetModal}>
              <X className='size-5 text-stone-400' />
              </button>
          </div>
          <p className='text-sm text-stone-400 mt-2'>
            Para confirmar a criação da viagem para <span className='font-semibold text-stone-100'>{destination}</span> nas datas de <span className='font-semibold text-stone-100'>${}</span> preencha seus dados abaixo:
          </p>
        </div>


        <form onSubmit={createTrip} action="" className='space-y-3'>
          <div className='h-14 px-5 flex items-center flex-1 gap-2  bg-stone-950 rounded-lg border-stone-300'>
            <UserRound className='size-5 text-stone-500'/>
            <input 
              type="name" 
              name='text' 
              onChange={event => setOwnerName(event.target.value)}
              placeholder='Seu nome completo' 
              className='bg-transparent text-lg placeholder-stone-400 outline-none flex-1'  />
          </div>
          <div className='h-14 px-5 flex items-center flex-1 gap-2  bg-stone-950 rounded-lg border-stone-300'>
            <Mail className='size-5 text-stone-500'/>
            <input 
              type="email" 
              name='email'
              onChange={event => setOwnerEmail(event.target.value)}
              placeholder='Seu e-mail pessoal' 
              className='bg-transparent text-lg placeholder-stone-400 outline-none flex-1'  />
          </div>
          <Button type="submit" size="full">
            Confirmar criação da viagem
          </Button>
        </form>
      </div>
    </div>
    )
}