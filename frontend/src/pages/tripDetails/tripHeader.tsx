import { MapPin, Calendar, Settings2 } from "lucide-react";
import { Button } from "../../components/button";

import {useParams} from 'react-router-dom'
import { api } from "../../lib/axios";
import { useEffect, useState } from "react";
import { ptBR } from "date-fns/locale/pt-BR";
import { format } from "date-fns";

interface Trip{
    id: string
    destination: string,
    startDate: string,
    endDate: string,
    isConfirmed: boolean
}
export function TripHeader() {
    const {tripId} = useParams()
    const [trip, setTrip] = useState<Trip | undefined>()

    useEffect(() => {
        api.get(`/trips/${tripId}`).then(response => setTrip(response.data.trip))
    }, [tripId]) //Só irá executar o que estiver dentro desse bloco quando o tripId mudar

    const displayedDate =  trip ?
        format(trip.startDate, "dd' de 'LLL") + ' a ' + format(trip.endDate, "dd' de 'LLL", {locale: ptBR})     
    : null

    return (
        <div className="px-4 h-16 rounded-xl bg-stone-900 shadow-shape flex items-center justify-between">
            <div className="flex items-center gap-2">
                <MapPin className=" size-5 text-stone-400" />
                <span className="text-lg text-stone-100">{trip?.destination}</span>
            </div>

            <div className="flex items-center gap-5">
                <div className="flex items-center gap-2">
                    <Calendar className=" size-5 text-stone-400" />
                    <span className="text-stone-100">{displayedDate}</span>
                </div>

                <div className='w-px h-6 bg-zinc-800'/>

                <Button bType="secondary">
                    Alterar local/data
                    <Settings2 className='size-5 text-stone-200 '/>
                </Button>
            </div>
        </div>
    )
}