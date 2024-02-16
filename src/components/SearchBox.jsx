import React, { useRef, useState, useContext } from 'react'
import { MediaContext } from '../Context'
import { baseUrl } from '../App'

const SearchBox = ({data}) => {
    const textRef = useRef(null)
    const mediaRef = useRef(null)
    const [results, setResults] = useState(null)
    const [currentMedia, setCurrentMedia] = useContext(MediaContext)

    //search for the desired video
    const handleChange = () =>{
        var query = textRef.current.value;
        const filteredData = data.filter((entry)=> entry.title.toLowerCase().includes(query))
        if(query){
            setResults(filteredData)
        }
        else{
            setResults(null)
        }
    }

    //play the clicked video
    const handleClick = (result) =>{
        setCurrentMedia({
            source: result.sources,
            title: result.title,
            description: result.description,
            thumb: `${baseUrl}${result.thumb}`,
        })
        setResults(null)
        textRef.current.value = null
    }

  return (
    <div>
        <input
        ref={textRef}
        className='w-full my-4 pl-2 py-2 bg-[#0a0a0a] outline text-white outline-gray-500/20 rounded-md focus:outline-gray-100/20'
        type="text"
        onChange={handleChange}
        placeholder='search here...'/>

        {/* Display the search results */}
        {results && (<ul className='w-full outline outline-gray-500/20 py-2 -mt-4 rounded bg-[#0a0a0a]' >
        {results?.map((result, index) => (
            <li 
            ref={mediaRef}
            className='cursor-pointer text-white my-2 hover:bg-violet-500 pl-2 py-2 transition ease-in-out' 
            key={index}
            onClick={()=>handleClick(result)}
            >{result.title}</li>
        ))}
        </ul>
        )}
    </div>
  )
}

export default SearchBox
