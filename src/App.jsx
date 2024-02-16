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
    source: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    title: "Big Buck Bunny",
    description: "Big Buck Bunny tells the story of a giant rabbit with a heart bigger than himself. When one sunny day three rodents rudely harass him, something snaps... and the rabbit ain't no bunny anymore! In the typical cartoon tradition he prepares the nasty rodents a comical revenge.\n\nLicensed under the Creative Commons Attribution license\nhttp://www.bigbuckbunny.org",
    thumb: `http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/BigBuckBunny.jpg`,
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
