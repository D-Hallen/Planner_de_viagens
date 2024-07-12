import { ArrowRight, UserRoundPlus } from "lucide-react";
import { Button } from "../../../components/button";

interface InviteGuestsStepProps {
    emailsToInvite: string[],
    openGuestsModal: () => void,
    closeGuestsModal: () => void,
    openConfirmSetModal: () => void
}

export function InviteGuestsStep({
    emailsToInvite,
    openGuestsModal,
    openConfirmSetModal
}:InviteGuestsStepProps){
    return (
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
              <Button onClick={openConfirmSetModal}>
                Confirmar Viagem
                <ArrowRight className='size-5 text-stone-950 '/>
              </Button>
            </div>
    )
}