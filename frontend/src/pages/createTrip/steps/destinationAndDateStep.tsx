import { ArrowRight, Calendar, MapPin, Settings2 } from "lucide-react"

interface DestinationNDateStepProps {
    isGuestsInputOpen: boolean,
    closeGuestsInput: () => void,
    openGuestsInput: () => void
}

export function DestinationNDateStep({
    isGuestsInputOpen,
    closeGuestsInput,
    openGuestsInput
} : DestinationNDateStepProps) {
    return (
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
    )
}