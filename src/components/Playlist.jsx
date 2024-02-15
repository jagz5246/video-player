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
    <div className=' sm:w-full md:w-1/2 lg:h-full outline outline-gray-200 rounded-md md:shadow-lg my-2 py-2 overflow-scroll'>
    
    <SearchBox data={media}/>
    {/* Playlist that can be re-ordered */}
      <Draggable className='list-none pt-2'>
      { media.map((data, index)=>(
            <li className='flex items-center ml-4 md:ml-0 gap-2 mb-1 rounded hover:bg-violet-100 md:px-5 py-2 transition ease-in-out delay-50 hover:-translate-y-2'
            onClick={()=>setCurrentMedia({
                source: data.sources,
                title: data.title,
                description: data.description,
                thumb: `${baseUrl}${data.thumb}`,
            })}

            key={index}>
                <FaBars className='align-middle text-xs' />
                <img src={`http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/${data.thumb}`}
                className='rounded-md'
                width={100}
                height={60}/>
                <div>
                <h2 className='text-sm md:text-md lg:text-lg font-semibold min-w-max'>{truncate(data.title,14)}</h2>
                <h3 className='text-xs md:text-sm lg:text-md leading-loose text-gray-500'>{data.subtitle}</h3>
                </div>
            </li>
        )) }
      </Draggable>

    </div>
  )

      }
export default Playlist


