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
        console.log(textRef.current.value)
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
    <div className='container'>
        <input
        ref={textRef}
        className=' sm:w-full lg:w-2/3 ml-2 my-4 pl-2 py-2 '
        type="text"
        onChange={handleChange}
        placeholder='search here...'/>

        {/* Display the search results */}
        {results && (<ul className='absolute border py-2 -mt-4 ml-2 rounded bg-white w-96' >
        {results?.map((result, index) => (
            <li 
            ref={mediaRef}
            className='cursor-pointer text-gray-900 my-2 hover:bg-violet-100 pl-2 py-2 transition ease-in-out' 
            key={index}
            onClick={()=>handleClick(result)}
            >{result.title}</li>
        ))}
        </ul>)}
    </div>
  )
}

export default SearchBox
