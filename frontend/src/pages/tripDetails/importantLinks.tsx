import { Link2, Plus } from "lucide-react";
import { Button } from "../../components/button";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { api } from "../../lib/axios";

interface ImportantLinksProps {
    openCreateLinkModal : () => void
}

interface Links {
    link: {
        id: string
        title: string
        url: string
    }
}

export function ImportantLinks ({ openCreateLinkModal } : ImportantLinksProps) {
    const {tripId} = useParams()
    const [linksVector, setLinks] = useState<Links[]>([])

    useEffect(() => {
        api.get(`/trips/${tripId}/links`).then(response => setLinks(response.data.links))
    }, [tripId])

    return (
        <div className="space-y-6">
            <h2 className="font-semibold text-xl">Links importantes</h2>

            <div className="space-y-5">
                {/* LINK */}
                {linksVector.length >0 ? (
                    linksVector.map (link => {
                        return (
                            <div className="flex items-center justify-between gap-4">
                                <div className="space-y-1.5 flex-1">
                                    <span className="block font-medium text-stone-100">{link.title}</span>
                                    <a href={link.url} className="block text-xs text-stone-400 truncate hover:text-stone-200">
                                        {link.url}
                                    </a>
                                </div>
                                <Link2 className='size-5 text-stone-400'/>
                </div>
                        )
                    })
                ) : <p className="text-stone-500 text-sm">Nenhum link foi cadastrado nessa viagem.</p>}
            </div>
            <Button bType="secondary" size="full" onClick={openCreateLinkModal}>
                <Plus className='size-5 text-stone-200 '/>
                Cadastrar novo link
            </Button>
        </div> 
    )
}