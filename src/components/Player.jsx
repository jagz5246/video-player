import React,{useContext, useState, useRef} from 'react';
import { MediaContext } from '../Context';
import ReactPlayer from 'react-player';
import Controls from './Controls';
import { formatTime } from './TimeFormat';
import {FaPlayCircle} from '@react-icons/all-files/fa/FaPlayCircle.esm'
import screenfull from 'screenfull';
import { baseUrl } from '../App';

let count =0

const Player = () => {
    const [currentMedia] = useContext(MediaContext)
    const videoPlayerRef = useRef(null);
    const controlRef = useRef(null)
    const fullScreenRef = useRef(null)
  

    const [videoState, setVideoState] = useState({
        playing: true,
        muted: false,
        playbackRate: 1,
        volume: 0.5,
        played: 0,
        seeking: false,
        Buffer : true
      });

      

    

    //Destructuring the properties from the videoState
    const {playing, muted, volume, playbackRate, played, seeking, buffer} = videoState

    //
    const progressHandler = (state) => {
        if (!seeking) {
            setVideoState({ ...videoState, ...state });
              }
        
        if (count > 3){
     
            // toggling visibility if idle for 4 secs
            controlRef.current.style.visibility = "hidden";
            count=0;
          
          }

          else if (controlRef.current.style.visibility === "visible") {
            count+=1;            
          }

        
      };

    //toggle visibility on mouseHover
    const handleVisibility = () => {
        controlRef.current.style.visibility = "visible";
        count = 0;
      };

    //toggle fullscreen mode
    const toggleFullScreen = () =>{
        screenfull.toggle(fullScreenRef.current)
    }   
   

    const playPauseHandler = () => {
    //toggle play and pause
        setVideoState({ ...videoState, playing: !videoState.playing });
    };  
    const rewindHandler = () => {

        //Rewinds the video player reducing 5
          videoPlayerRef.current.seekTo(videoPlayerRef.current.getCurrentTime() - 5);
        };
    const forwardHandler = () => {
        //Forwards the video player increasing 5
        videoPlayerRef.current.seekTo(videoPlayerRef.current.getCurrentTime() + 5);
    };

    const seekHandler = (e, value) => {
        setVideoState({ ...videoState, played: parseFloat(value) / 100 });
      };
     
    const seekMouseUpHandler = (e, value ) => {
        setVideoState({ ...videoState, seeking: false });
        videoPlayerRef.current.seekTo(value / 100);
      };
    const volumeChangeHandler = (e, value) => {
        const newVolume = parseFloat(value) / 100;
          setVideoState({
            ...videoState,
            volume: newVolume,
            muted: Number(newVolume) === 0 ? true : false, // volume === 0 then muted
          })
       
    };
       
    const volumeSeekUpHandler = (e, value) => {
        const newVolume = parseFloat(value) / 100;
          setVideoState({
            ...videoState,
            volume: newVolume,
            muted: newVolume === 0 ? true : false,
    })};

    const playBackRateHandler = (rate) =>{
        if(playbackRate < 5.0){
            setVideoState({ ...videoState, playbackRate: playbackRate+rate });
        }
        else{
            setVideoState({ ...videoState, playbackRate: 1 });
        }
    }

    const muteHandler = () => {
        //Mutes the video player
          setVideoState({ ...videoState, muted: !videoState.muted });
        };
    

    const currentTime = videoPlayerRef.current? videoPlayerRef.current.getCurrentTime(): "00:00";
    const duration = videoPlayerRef.current? videoPlayerRef.current.getDuration(): "00:00";

    const formatCurrentTime = formatTime(currentTime)
    const formatDuration = formatTime(duration)

  return (
    
    <div className=' mt-2 w-full md:min-w-2/3 md:h-full' onMouseMove={handleVisibility} ref={fullScreenRef}>
        <div className='min-w-1/2 h-full'>
        <ReactPlayer style={{background:'black', borderRadius:'10px'}}
            ref={videoPlayerRef}
            playbackRate={playbackRate}
            playing={playing}
            playIcon={<div style={{width:'100%', height:'100%', background:'linear-gradient(rgba(0,0,0,0.5),rgba(0,0,0,0.5))'}}>
              <FaPlayCircle style={{width:'10%', height:'10%', color:'#f7f5f7', marginTop:'20%', marginLeft:'45%',marginBottom:'20%'}}/>
            </div>}
            volume = {volume}
            muted={muted}
            width="100%"
            height="98%"
            url={currentMedia.source}
            light={`${currentMedia.thumb}`}
            // light='http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/BigBuckBunny.jpg'
            onProgress = {progressHandler}
         />
         <div className=' w-full -mt-15 mx-auto relative'>
            <Controls
            onMouseOver = {()=>mouseMoveHandler} 
            ref={controlRef}
            onPlayPause={playPauseHandler} 
            playing={playing}
            onRewind={rewindHandler}
            onForward ={forwardHandler }
            onProgress = {progressHandler}
            onToggleFullScreen = {toggleFullScreen}
            playRate = {playbackRate}
            onPlayRate = {playBackRateHandler}
            played ={played}
            onSeek ={seekHandler}
            onSeekMouseUp ={seekMouseUpHandler}
            volume={volume}
            onVolumeChangeHandler = {volumeChangeHandler}
            onVolumeSeekUp = {volumeSeekUpHandler}
            mute = {muted}
            onMute = {muteHandler}
            duration = {formatDuration}
            currentTime = {formatCurrentTime}
            />
         </div>
        
      </div>
     
      <div className='mt-5 py-5'>
        <h1 className='text-xl md:text-2xl text-white font-bold pb-2 mb-2'>{currentMedia.title}</h1>
        <h2 className='text-sm outline text-gray-100 outline-gray-500/20 p-5 rounded-md md:text-md font-light'>{currentMedia.description}</h2>
      </div>
      
    </div>
  )
}

export default Player
