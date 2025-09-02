import "./App.css";
import { useState, useEffect } from "react";
import SearchBar from "./Components/SearchBar";
import SearchResults from "./Components/SearchResults";
import Playlist from "./Components/Playlist";
import Spotify from "./Components/Spotify";

function App() {
  const [token, setToken] = useState("");
  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [playlistTracks, setPlaylistTracks] = useState([]);
  const [playlistName, setPlaylistName] = useState("New Playlist");

  useEffect(() => {
    const t = Spotify.getAccessToken();
    if (t) setToken(t);
  }, []);

  const handleLogin = () => Spotify.getAccessToken();

  const search = async () => {
    if (!token) return alert("Please log in to Spotify first!");
    const results = await Spotify.search(query);
    setSearchResults(results);
  };

  const addTrack = (track) => {
    if (playlistTracks.some((t) => t.id === track.id)) return;
    setPlaylistTracks((prev) => [...prev, track]);
  };

  const removeTrack = (track) => {
    setPlaylistTracks((prev) => prev.filter((t) => t.id !== track.id));
  };

  const savePlaylist = async () => {
    const trackUris = playlistTracks.map((t) => t.uri);
    await Spotify.savePlaylist(playlistName, trackUris);
    setPlaylistName("New Playlist");
    setPlaylistTracks([]);
  };

  if (!token) {
    return <button onClick={handleLogin}>Connect to Spotify</button>;
  }

  return (
    <>
      <h1>Playlist Builder</h1>
      <SearchBar value={query} onChange={setQuery} onSearch={search} />
      <div className="flexbox">
        <SearchResults tracks={searchResults} onAdd={addTrack} />
        <Playlist
          name={playlistName}
          tracks={playlistTracks}
          onRemove={removeTrack}
          onNameChange={setPlaylistName}
          onSave={savePlaylist}
        />
      </div>
    </>
  );
}

export default App;
