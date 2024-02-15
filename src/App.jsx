import { useState, createContext } from 'react'
import { videos } from './data'
import './App.css'
import { MediaContext } from './Context'
import Player from './components/Player'
import Playlist from './components/Playlist'
import Navbar from './components/Navbar'

export const baseUrl = 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/'
function App() {



  const [currentMedia, setCurrentMedia] = useState({
    source: videos[0].sources,
    title: videos[0].title,
    description: videos[0].description,
    thumb: `${baseUrl}${videos[0].thumb}`,
  })

  return (
    <MediaContext.Provider value={[currentMedia, setCurrentMedia]}>
      <div className='bg-[#0a0a0a]'>
      <Navbar />
      <div className=' min-h-screen min-w-full lg:flex lg:gap-6 justify-center p-10'>
      <Player/>
      <Playlist media={videos}/>
    </div>
      </div>
    </MediaContext.Provider>
  )
}

export default App
