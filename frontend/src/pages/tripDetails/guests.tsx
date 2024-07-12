import { CircleDashed, CircleCheck, UserCog2 } from "lucide-react";
import { Button } from "../../components/button";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { api } from "../../lib/axios";

interface Participant{
    id: string,
    name: string | null,
    email: string,
    isConfirmed: boolean
}
export function Guests (){
    const {tripId} = useParams()
    const [participants, setParticipants] = useState<Participant[]>([])

    useEffect(() => {
        api.get(`/trips/${tripId}/participants`).then(response => setParticipants(response.data.participants))
    }, [tripId]) //Só irá executar o que estiver dentro desse bloco quando o tripId mudar

    return (
        <div className="space-y-6"> 
                        <h2 className="font-semibold text-xl">Convidados</h2>

                        <div className="space-y-5">
                            {/* PARTICIPANTES */}
                            {participants.map((participant, index) => {
                                return (
                                    <div key={participant.id} className="flex items-center justify-between gap-4">
                                        <div className="space-y-1.5 flex-1">
                                            <span className="block font-medium text-stone-100">{participant.name? participant.name : `Convidado ${index}`}</span>
                                            <span className="block text-sm text-stone-400 truncate">
                                                {participant.email}
                                            </span>
                                        </div>
                                        {participant.isConfirmed ? (
                                            <CircleCheck className='size-5 text-yellow-400'/>
                                        ): (
                                            <CircleDashed className='size-5 text-stone-400'/>
                                        )}
                                    </div>
                                )
                            })}

                            
                        </div>
                        <Button bType="secondary" size="full">
                            <UserCog2 className='size-5 text-stone-200 '/>
                            Gerenciar Convidados
                        </Button>
                    </div>
    )
}