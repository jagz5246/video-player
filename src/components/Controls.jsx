import React from 'react';
import {FaPlay} from '@react-icons/all-files/fa/FaPlay.esm'
import {FaPause} from '@react-icons/all-files/fa/FaPause.esm'
import {FaForward} from '@react-icons/all-files/fa/FaForward.esm' 
import {FaBackward} from '@react-icons/all-files/fa/FaBackward.esm' 
import {FaVolumeUp} from '@react-icons/all-files/fa/FaVolumeUp.esm'
import {FaVolumeMute} from '@react-icons/all-files/fa/FaVolumeMute.esm'
import {FaExpand} from '@react-icons/all-files/fa/FaExpand.esm' 
import Slider from '@mui/material/Slider';
import { forwardRef } from "react";




const Controls = forwardRef(({
    playing, 
    onPlayPause,
    onForward, 
    onRewind, 
    played, 
    onToggleFullScreen,
    playRate,
    onPlayRate,
    onSeek, 
    onSeekMouseUp, 
    volume, 
    onVolumeChangeHandler, 
    onVolumeSeekUp,
    mute,
    onMute,
    duration,
    currentTime,
    }, ref) => {
    



  return (
    <div ref={ref}
    className=' -mt-14'>
        <Slider style={{ position:'relative', color: "#6d08cc", width:'100%', marginBottom:'-20px'}}
            min = {0}
            max = {100}
            value = {played * 100} 
            aria-label="Default" 
            onChange={onSeek}
            onChangeCommitted={onSeekMouseUp} />
    <div className='flex md:gap-4 min-w-full  py-2 px-2 justify-center items-center rounded-md bg-white'>

        <div className="flex md:gap-2 items-center mx-2">
        <FaBackward className='cursor-pointer md:text-2xl mx-2 text-gray-900 hover:text-violet-700 transition ease-in-out delay-50' onClick={onRewind}/>
        {playing ? <FaPause className='cursor-pointer md:text-2xl mx-2 text-gray-900  hover:text-violet-700 transition ease-in-out delay-50' onClick={onPlayPause}/> : 
                   <FaPlay className='cursor-pointer md:text-2xl mx-2 text-gray-900  hover:text-violet-700 transition ease-in-out delay-50' onClick={onPlayPause}/>
        }
        
        <FaForward className='cursor-pointer md:text-2xl mx-2 text-gray-900 hover:text-violet-700 transition ease-in-out delay-50' onClick={onForward}/>
        </div>
        <div className='w-full flex items-center gap-2 md:gap-4'>
            
            <span className='text-sm text-gray-700 font-semibold'>{currentTime} / {duration}</span>
        </div>
            <div className='flex gap-4 items-center'>
                { mute ? <FaVolumeMute className='text-xl hover:text-violet-700 transition ease-in-out delay-50'/> : 
                <FaVolumeUp onClick={onMute} className='text-xl hover:text-violet-700 transition ease-in-out delay-50 cursor-pointer'/>}
                <Slider
                aria-label='slider'
                style={{ color: "#6d08cc", width:'80px' }}
                onChange={onVolumeChangeHandler}
                role="slider"
                aria-valuenow={ mute ? 0 : volume * 100}
                aria-valuemin="0"
                aria-valuemax="100"
                min = {0}
                max = {100}
                value= { mute ? 0 : volume * 100}
                onChangeCommitted={onVolumeSeekUp}
                />
            </div>
           
            <div className='flex md:gap-2 items-center'>
                <span className='text-md px-2 cursor-pointer hover:text-violet-700 transition ease-in-out delay-50 text-black'
                onClick={()=>onPlayRate(0.5)}
                >{playRate}x</span>
                <FaExpand onClick={onToggleFullScreen} className='text-xl mx-2 hover:text-violet-700 transition ease-in-out delay-50 cursor-pointer'/>
            </div>
        </div>
         
    </div>

  )
})

export default Controls