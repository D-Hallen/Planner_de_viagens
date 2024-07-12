import { CircleCheck } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "../../lib/axios";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

interface Activity {
    date: string
    activities: {
        id: string
        title: string
        date: string
    }
}

export function ActivitiesList () {
    const {tripId} = useParams()
    const [activities, setActivities] = useState<Activity[]>([])

    useEffect(() => {
        api.get(`/trips/${tripId}/activities`).then(response => setActivities(response.data.activities))
    }, [tripId])


    return (
        <div className="space-y-8 " > 

        {activities.map(category => {
            return (
                <div key={category.date} className="space-y-2.5"> 
                    <div className="flex gap-2 items-baseline">
                        <span className="text-lg text-stone-300 font-semibold">Dia {format(category.date, 'd')}</span>
                        <span className="text-xs text-stone-500">{format(category.date, 'EEEE',  { locale: ptBR })}</span>
                    </div>

                    {/*LISTA DE ATIVIDADES*/}
                    
                    <div className="space-y-2.5">
                        {category.activities.length > 0? (
                            category.activities.map(activity => {
                                return (
                                    <div key={activity.id} >
                                      <div className="px-4 py-2.5 bg-zinc-900 rounded-xl shadow-shape flex items-center gap-3">
                                        <CircleCheck className="size-5 text-lime-300" />
                                        <span className="text-zinc-100">{activity.title}</span>
                                        <span className="text-zinc-400 text-sm ml-auto">
                                          {format(activity.date, 'HH:mm')}h
                                        </span>
                                      </div>
                                    </div>
                                  )  
                            })
                         ): <p className="text-stone-500 text-sm">Nenhuma atividade cadastrada nessa data.</p>}
                    </div>
                </div>
            )
            })}

        </div>
    )
}
