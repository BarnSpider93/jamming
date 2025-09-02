import logo from './logo.svg';
import './App.css';
import { useState } from "react";
import SearchBar from './Components/SearchBar.js'
import SearchResults from './Components/SearchResults.js'
import Playlist from './Components/Playlist.js'
import Tracklist from './Components/Tracklist.js'
import Track from './Components/Track.js'




function App() {
  const [query, setQuery] = useState('');
  const [searchResults, setSearchResults] = useState('');

  const handleSearch = () => {
    //replace with API call
    const fakeResults = [
      { id: 1, name: 'Song 1', artist: 'Artist A' },
      { id: 2, name: 'Song 2', artist: 'Artist B' }
    ];
    setSearchResults(fakeResults);
  };

  return (
    <>
      <h1>Playlist Builder</h1>
      <SearchBar value={query} onChange={setQuery} onSearch={handleSearch}/>
      <div className='flexbox'>
        <SearchResults results={searchResults || []}/>
        <Playlist />
      </div>
    </>
  ) 

}

export default App;
