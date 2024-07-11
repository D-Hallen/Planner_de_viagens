import { AtSign, Plus, X } from "lucide-react"
import { FormEvent } from "react"

interface InviteGuestsModalProps {
    closeGuestsModal: () => void,
    emailsToInvite: string[]
    addNewEmailtoInvite: (event: FormEvent<HTMLFormElement>) => void
    removeEmailFromList: (emailToRemove: string) => void
}

export function InviteGuestsModal ({
    closeGuestsModal, emailsToInvite, addNewEmailtoInvite, removeEmailFromList
}: InviteGuestsModalProps){
    
    return (
        <div className='fixed inset-0 bg-black/60 flex items-center justify-center'>
          <div className='w-[640px] rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5'>
            <div>
              <div className='flex items-center justify-between'>
                <h2 className='font-semibold text-lg'>Selecionar convidados</h2>
                <button type='button' className='hover:bg-zinc-800 rounded-full p-1' onClick={closeGuestsModal}>
                  <X className='size-5 text-stone-400' />
                  </button>
              </div>
              <p className='text-sm text-stone-400 mt-2'>
                Os convidados irão receber e-mails para confirmar a participação na viagem.
              </p>
            </div>

            <div className='flex flex-wrap gap-2'>
              {emailsToInvite.map(email => {
                return (
                  <div key={email} className='py-1.5 px-2.5 rounded-md bg-stone-800 flex items-center gap-2'>
                    <span className='text-stone-300'>{email}</span>
                    <button type='button' onClick={() =>removeEmailFromList(email)}>
                    <X className='size-4 text-stone-400' />
                  </button>
              </div>
                )
              })}
            </div>

            <hr className='border-stone-800'/>

            <form onSubmit={addNewEmailtoInvite} action="" className='p-2.5 bg-stone-950 rounded-lg border-stone-300 flex items-center gap-2'>
              
              <div className='px-2 flex items-center flex-1 gap-2'>
                <AtSign className='size-5 text-stone-400'/>
                <input 
                  type="email" 
                  name='email' 
                  placeholder='Digite o e-mail do convidado' 
                  className='bg-transparent text-lg placeholder-stone-400 outline-none flex-1'  />
              </div>

              <button type='submit' className='bg-yellow-400 text-stone-950 rounded-lg px-5 py-2 font-medium flex items-center gap-2 hover:bg-yellow-500'>
              Convidar
              <Plus className='size-5 text-stone-950 '/>

            </button>
            </form>
          </div>
        </div>
    )
}