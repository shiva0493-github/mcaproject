import { useState, useEffect} from 'react';
import { SearchInput } from '../styles/TextImages';
import { Expander } from '../styles/TextImages'

const SearchBar = ({onChange, count}) => {

    const [searchQuery, setSearchQuery] = useState('')

    useEffect (() => {
        if(onChange !== undefined){
            onChange(searchQuery)
        }
    },[searchQuery])

    return (
       <div>
            {/* <label htmlFor="header-search">
                <span className="visually-hidden">Search blog posts</span>
            </label> */}
            <span style={{padding:'1vh',fontSize:'2.5vh', color:'white', backgroundColor:'#70879e',borderRadius:'1vh'}}>{count}</span>&nbsp;
            <SearchInput
                type="text"
                id="header-search"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Filter Podcasts"
                // name="s" 
            />
            {/* <button type="submit">Search</button> */}
        </div>
    )
}

export default SearchBar


