import { ArrowRight, Calendar, MapPin, Settings2, X } from "lucide-react"
import { Button } from "../../../components/button"
import { useState } from "react"
import { DateRange, DayPicker } from "react-day-picker"
import "react-day-picker/dist/style.css";
import {format } from 'date-fns'
import { ptBR } from "date-fns/locale/pt-BR";
interface DestinationNDateStepProps {
    isGuestsInputOpen: boolean,
    closeGuestsInput: () => void,
    openGuestsInput: () => void,
    setDestination: (destination: string) => void,
    setEventDates: (dates: DateRange | undefined) => void,
    eventDates: DateRange | undefined
}

export function DestinationNDateStep({
    isGuestsInputOpen,
    closeGuestsInput,
    openGuestsInput,
    setDestination,
    setEventDates,
    eventDates
} : DestinationNDateStepProps) {

    const [isDatePickerOpen, setIsDatePickerOpen] = useState(false)

    function openDatePicker () {
        setIsDatePickerOpen(true)
    }

    function closeDatePicker () {
        setIsDatePickerOpen(false)
    }

    const displayedDate = eventDates && eventDates.from  && eventDates.to?  
    (
        format(eventDates.from, "dd' de 'LLL") + ' a ' + format(eventDates.to, "dd' de 'LLL", {locale: ptBR})     
    ): null

    return (
        <div className="h-16 px-4 bg-zinc-900 rounded-xl flex items-center shadow-shape gap-3">
            <div className='flex items-center gap-2 flex-1'>
                <MapPin className='size-5 text-stone-400'/>
                <input 
                    disabled= {isGuestsInputOpen}
                    type="text" placeholder="Para onde você vai?"
                    className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1"
                    onChange={event => setDestination(event.target.value)}/>
            </div>


            <button onClick={openDatePicker} type="button" disabled= {isGuestsInputOpen} className='flex items-center gap-2 outline-none'>
                <Calendar className='size-5 text-stone-400'/>
                <span  className=" text-lg text-zinc-400 min-w-40 text-left px-2"
                >
                    {displayedDate ||'Quando?'}
                </span>
            </button>

            <div className='w-px h-6 bg-zinc-800'/>

            {isGuestsInputOpen ? (
            <Button onClick={closeGuestsInput} bType="secondary">
                Alterar local/data
                <Settings2 className='size-5 text-stone-200 '/>
            </Button>
            ): (
               
            <Button bType='primary' onClick={openGuestsInput}>
                Continuar
                <ArrowRight className='size-5 text-stone-950 '/>
            </Button>
            )}

            {/* Date Picker Modal */}
            {isDatePickerOpen && (
                <div className='fixed inset-0 bg-black/60 flex items-center justify-center'>
                    <div className='rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5'>
                        <div>
                            <div className='flex items-center justify-between'>
                            <h2 className='font-semibold text-lg'>Selecione a Data</h2>
                            <button type='button' className='hover:bg-zinc-800 rounded-full p-1' onClick={closeDatePicker}>
                                <X className='size-5 text-stone-400' />
                                </button>
                            </div>
                        </div>
                        <DayPicker mode='range' selected={eventDates} onSelect={setEventDates} showOutsideDays fixedWeeks/>
                    </div>
                </div>
            )}


        </div>
    )
}