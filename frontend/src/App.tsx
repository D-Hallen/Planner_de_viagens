import {MapPin, Calendar, ArrowRight} from 'lucide-react'

export function App() {
  return (
    <div className="h-screen flex items-center justify-center bg-pattern bg-no-repeat bg-center">
      <div className="max-w-3xl w-full px-6 text-center space-y-10">
        <p className="text-stone-300 text-large">Convide seus amigos e planeje sua próxima viagem!</p>
        
        <div className="h-16 px-4 bg-zinc-900 rounded-xl flex items-center shadow-shape gap-3">
          <div className='flex items-center gap-2 flex-1'>
            <MapPin className='size-5 text-zinc-400'/>
            <input type="text" placeholder="Para onde você vai?" className="bg-transparent text-lg placeholder-zinc-400 outline-none"/>
          </div>


          <div className='flex items-center gap-2 '>
            <Calendar className='size-5 text-zinc-400'/>
            <input type="text" placeholder="Quando?"  className="bg-transparent text-lg placeholder-zinc-400 w-40 outline-none"/>
          </div>

          <div className='w-px h-6 bg-zinc-800'/>

          <button className='bg-yellow-400 text-stone-950 rounded-lg px-5 py-2 font-medium flex items-center gap-2 hover:bg-yellow-500'>
            Continuar
            <ArrowRight className='size-5 text-stone-950 '/>
          </button>
        </div>

        <p className="text-stone-400 text-sm">
          Ao planejar sua viagem pela plann.er você automaticamente concorda <br />
          com nossos <a href="#" className="text-stone-300 underline">termos de uso</a> e <a href="#" className="text-stone-300 underline">políticas de privacidade.</a>
        </p>
      </div>
  </div>
  )
}

