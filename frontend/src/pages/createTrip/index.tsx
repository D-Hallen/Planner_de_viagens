import { MapPin, Calendar, ArrowRight, UserRoundPlus, Settings2, X, UserRound, Mail } from 'lucide-react'
import { FormEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { InviteGuestsModal } from './inviteGuestsModal'
import { ConfirmTripModal } from './confirmTripModal'

export function CreateTripPage() {
  const navigate = useNavigate()

  const [isGuestsInputOpen, setIsGuestsInputOpen] = useState(false)
  const [isGuestsModalOpen, setIsGuestsModalOpen] = useState(false)
  const [isConfirmSetModalOpen, setIsConfirmSetModalOpen] = useState(false)

  const [emailsToInvite, setEmailsToInvite] = useState<string[]>([]) //especificar o tipo string para evitar erros de compatibilidade

  function openGuestsInput (){
    setIsGuestsInputOpen(true)
  }

  function closeGuestsInput (){
    setIsGuestsInputOpen(false)
  }

  function openGuestsModal (){
    setIsGuestsModalOpen(true)
  }

  function closeGuestsModal (){
    setIsGuestsModalOpen(false)
  }

  function openConfirmSetModal (){
    setIsConfirmSetModalOpen(true)
  }

  function closeConfirmSetModal (){
    setIsConfirmSetModalOpen(false)
  }

  function addNewEmailtoInvite (event: FormEvent<HTMLFormElement>){
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const email = data.get('email')?.toString()
    
    if (!email){
      return
    }

    if( emailsToInvite.includes(email)){
      return
    }
    setEmailsToInvite([...emailsToInvite, email])

    event.currentTarget.reset()
  }

  function removeEmailFromList (emailToRemove: string){
    const newEmailList = emailsToInvite.filter(email => email !== emailToRemove)
    setEmailsToInvite(newEmailList)

  }

  function createTrip(event: FormEvent<HTMLFormElement>){
    navigate ('/trips/123')
  }



  return (
    <div className="h-screen flex items-center justify-center bg-pattern bg-no-repeat bg-center">
      <div className="max-w-3xl w-full px-6 text-center space-y-10"> 
        <div className='flex flex-col items-center gap-3'>
        <img src="/logo.svg" alt="Logo plann.er" />
        <p className="text-stone-300 text-large">Convide seus amigos e planeje sua próxima viagem!</p>
        </div>

        <div className='flex flex-col gap-4'>
          <div className="h-16 px-4 bg-zinc-900 rounded-xl flex items-center shadow-shape gap-3">
            <div className='flex items-center gap-2 flex-1'>
              <MapPin className='size-5 text-stone-400'/>
              <input disabled= {isGuestsInputOpen} type="text" placeholder="Para onde você vai?" className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1"/>
            </div>


            <div className='flex items-center gap-2 '>
              <Calendar className='size-5 text-stone-400'/>
              <input disabled= {isGuestsInputOpen} type="text" placeholder="Quando?"  className="bg-transparent text-lg placeholder-zinc-400 w-40 outline-none"/>
            </div>

            <div className='w-px h-6 bg-zinc-800'/>

            {isGuestsInputOpen ? (
              <button onClick={closeGuestsInput} className='bg-stone-800 text-stone-200 rounded-lg px-5 py-2 font-medium flex items-center gap-2 hover:bg-stone-700'>
              Alterar local/data
              <Settings2 className='size-5 text-stone-200 '/>
            </button>
            ): (
              <button onClick={openGuestsInput} className='bg-yellow-400 text-stone-950 rounded-lg px-5 py-2 font-medium flex items-center gap-2 hover:bg-yellow-500'>
              Continuar
              <ArrowRight className='size-5 text-stone-950 '/>
            </button>
            )}
          </div>

          {isGuestsInputOpen && ( //if isGuestsInputOpen
            <div className="h-16 px-4 bg-zinc-900 rounded-xl flex items-center shadow-shape gap-3">
              <button type='button' onClick={openGuestsModal} className='flex items-center gap-2 flex-1'>
                <UserRoundPlus className='size-5 text-stone-400'/>
                {emailsToInvite.length > 0 ? (
                  <span className='text-stone-100 text-lg flex-1 text-left'>
                    {emailsToInvite.length} pessoa(s) convidada(s)</span>
                ) : (
                  <span className='text-stone-400 text-lg flex-1 text-left'>Quem estará na viagem?</span>
                )}
              </button>

              <button type='button' onClick={openConfirmSetModal} className='bg-yellow-400 text-stone-950 rounded-lg px-5 py-2 font-medium flex items-center gap-2 hover:bg-yellow-500'>
                Confirmar Viagem
                <ArrowRight className='size-5 text-stone-950 '/>
              </button>
            </div>
          )}
        </div>

        <p className="text-stone-400 text-sm">
          Ao planejar sua viagem pela plann.er você automaticamente concorda <br />
          com nossos <a href="#" className="text-stone-300 underline">termos de uso</a> e <a href="#" className="text-stone-300 underline">políticas de privacidade.</a>
        </p>
      </div>


      {isGuestsModalOpen &&(
        <InviteGuestsModal 
        addNewEmailtoInvite={addNewEmailtoInvite} 
        closeGuestsModal={closeGuestsModal} 
        emailsToInvite={emailsToInvite} 
        removeEmailFromList={removeEmailFromList}/>
      )}

  {isConfirmSetModalOpen && (
    <ConfirmTripModal
      closeConfirmSetModal={closeConfirmSetModal}
      createTrip={createTrip}
    />
)}

  </div>
  )
}

 