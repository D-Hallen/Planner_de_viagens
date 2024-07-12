import { FormEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { InviteGuestsModal } from './inviteGuestsModal'
import { ConfirmTripModal } from './confirmTripModal'
import { DestinationNDateStep } from './steps/destinationAndDateStep'
import { InviteGuestsStep } from './steps/inviteGuestsStep'
import { DateRange } from 'react-day-picker'
import { api } from '../../lib/axios'

export function CreateTripPage() {
  const navigate = useNavigate()

  const [isGuestsInputOpen, setIsGuestsInputOpen] = useState(false)
  const [isGuestsModalOpen, setIsGuestsModalOpen] = useState(false)
  const [isConfirmSetModalOpen, setIsConfirmSetModalOpen] = useState(false)

  const [emailsToInvite, setEmailsToInvite] = useState<string[]>([]) //especificar o tipo string para evitar erros de compatibilidade
  const [destination, setDestination] =useState<string>('')
  const [ownerName, setOwnerName] =useState<string>('')
  const [ownerEmail, setOwnerEmail] =useState<string>('')
  const [eventDates, setEventDates] = useState<DateRange | undefined>()

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

  async function createTrip(event: FormEvent<HTMLFormElement>){
    event.preventDefault()
    // console.log(eventDates, destination, ownerName, ownerEmail, emailsToInvite)

    if (!destination || !eventDates ||!eventDates.from || !eventDates.to || !ownerName || !ownerEmail){
      return
    }
    console.log (destination)
    const response = await api.post('/trips', {
      destination: destination.toString(),
      startDate: eventDates.from,
      endDate: eventDates.to,
      ownerName: ownerName,
      ownerEmail: ownerEmail,
      emailsToInvite: emailsToInvite
  })

    const { tripId } = response.data
    
    navigate (`/trips/${tripId}`)
  }



  return (
    <div className="h-screen flex items-center justify-center bg-pattern bg-no-repeat bg-center">
      <div className="max-w-3xl w-full px-6 text-center space-y-10"> 
        <div className='flex flex-col items-center gap-3'>
        <img src="/logo.svg" alt="Logo plann.er" />
        <p className="text-stone-300 text-large">Convide seus amigos e planeje sua próxima viagem!</p>
        </div>

        <div className='flex flex-col gap-4'>
          <DestinationNDateStep
          closeGuestsInput={closeGuestsInput}
          openGuestsInput={openGuestsInput}
          isGuestsInputOpen={isGuestsInputOpen}
          setDestination = {setDestination}
          setEventDates = {setEventDates}
          eventDates={eventDates}
          />

          {isGuestsInputOpen && ( //if isGuestsInputOpen
            <InviteGuestsStep 
            closeGuestsModal={closeGuestsModal}
            emailsToInvite={emailsToInvite}
            openConfirmSetModal={openConfirmSetModal}
            openGuestsModal={openGuestsModal}
            />
          )}
        </div>

        <p className="text-stone-400 text-sm">
          Ao planejar sua viagem pela plann.er você automaticamente concorda <br />
          com nossos <a href="#" className="text-stone-300 underline">termos de uso</a> e <a href="#" className="text-stone-300 underline">políticas de privacidade.</a>
        </p>
      </div>


      {isGuestsModalOpen &&(
        <InviteGuestsModal 
        closeGuestsModal={closeGuestsModal}
        addNewEmailtoInvite={addNewEmailtoInvite}
        emailsToInvite={emailsToInvite}
        removeEmailFromList={removeEmailFromList}/>
      )}

  {isConfirmSetModalOpen && (
    <ConfirmTripModal
      closeConfirmSetModal={closeConfirmSetModal}
      createTrip={createTrip}
      setOwnerName={setOwnerName}
      setOwnerEmail={setOwnerEmail}
      destination={destination}
      eventDates={eventDates}
    />
)}

  </div>
  )
}

 