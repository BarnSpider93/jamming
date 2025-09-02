import { useState } from 'react'

function SearchBar({value, onChange, onSearch}) {
    return (
        <div>
            <input
                type='text'
                placeholder='search for songs' 
                value={value}
                onChange={(e) => onChange(e.target.value)}/>
            <button onClick={onSearch}>Search</button>
        </div>
    )
}

export default SearchBar