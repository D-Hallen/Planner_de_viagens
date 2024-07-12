import { Plus } from "lucide-react";
import { useState } from "react";
import { CreateActivityModal } from "./createActivityModal";
import { ImportantLinks } from "./importantLinks";
import { Guests } from "./guests";
import { ActivitiesList } from "./activityList";
import { TripHeader } from "./tripHeader";
import { Button } from "../../components/button";
import { CreateLinkModal } from "./createLinkModal";

export function TripDetailsPage() {

    const[isCreateActivityModalOpen, setIsCreateActivityModalOpen] = useState(false)
    const[isCreateLinkModalOpen, setIsCreateLinkModalOpen] = useState(false)
    // const[] = useState(false)

    function openCreateActivityModal () {
        setIsCreateActivityModalOpen(true)
    }

    function closeCreateActivityModal () {
        setIsCreateActivityModalOpen(false)
    }

    function openCreateLinkModal () {
        setIsCreateLinkModalOpen(true)
    }

    function closeCreateLinkModal () {
        setIsCreateLinkModalOpen(false)
    }

    return (
        <div className="max-w-6xl px-6 py-10 mx-auto" >
            <div className="space-y-8">
            <TripHeader/>
            <main className="flex gap-16 px-4 ">
                {/* DIAS E ATIVIDADES */}
                <div className="flex-1 space-y-6">
                    
                    <div className="flex items-center justify-between">
                        <h2 className="text-3xl font-semibold">Atividades</h2>

                        <Button onClick={openCreateActivityModal}>
                            <Plus className='size-5 text-stone-950 '/>
                            Cadastrar Atividade
                        </Button>
                    </div>
                    <ActivitiesList/>
                </div>
                {/* LINKS E CONVIDADOS */}
                <div className="w-80 space-y-6">
                    {/* LINKS */}
                    <ImportantLinks
                    openCreateLinkModal={openCreateLinkModal} /> 
                    
                    <hr className='border-stone-800'/>
                    {/* CONVIDADOS */}
                    <Guests />   
                </div>
            </main>
            </div>

            {/* CREATE ACTIVITY MODAL */}
            {isCreateActivityModalOpen && (
            <CreateActivityModal
            closeCreateActivityModal={closeCreateActivityModal}
            />
            )}

            {/* CREATE LINK MODAL */}
            {isCreateLinkModalOpen && (
            <CreateLinkModal
            closeCreateLinkModal={closeCreateLinkModal}
            />
            )}


        </div>
    )
}