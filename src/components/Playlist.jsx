import React, { useContext } from 'react'
import { Draggable } from "react-drag-reorder";
import { FaBars } from "@react-icons/all-files/fa/FaBars";
import { MediaContext } from '../Context';
import { baseUrl } from '../App';
import SearchBox from './SearchBox';

const Playlist = ({media}) => {

    //Use context to set the current media
    const [currentMedia, setCurrentMedia] = useContext(MediaContext)
    const truncate=(string, n)=>{
      return string?.length>n ? string.substr(0,n-1) + "..." : string;
    }

    return (
    <div className=' sm:w-full md:w-1/2 lg:h-full outline outline-gray-500/20 rounded-md my-2 px-4 py-2 overflow-scroll'>
    
    <SearchBox data={media}/>
    {/* Playlist that can be re-ordered */}
      <Draggable className='list-none pt-2'>
      { media.map((data, index)=>(
            <li className='flex items-center ml-4 md:ml-0 gap-2 mb-1 rounded hover:bg-violet-500 md:px-5 py-2 transition ease-in-out delay-50 hover:-translate-y-2'
            onClick={()=>setCurrentMedia({
                source: data.sources,
                title: data.title,
                description: data.description,
                thumb: `${baseUrl}${data.thumb}`,
            })}

            key={index}>
                <FaBars className='text-white align-middle text-xs'/>
                <img src={`http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/${data.thumb}`}
                className='rounded-md'
                alt='thumbnail'
                title='Drag to reorder'
                width={100}
                height={60}/>
                <div>
                <h2 className='text-sm text-white md:text-md lg:text-lg font-medium min-w-max'>{truncate(data.title,14)}</h2>
                <h3 className='text-xs md:text-sm lg:text-md font-thin text-gray-300'>{data.subtitle}</h3>
                </div>
            </li>
        )) }
      </Draggable>

    </div>
  )

      }
export default Playlist


