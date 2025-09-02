import Tracklist from './Tracklist.js'

function Playlist({ name, tracks, onRemove, onNameChange, onSave }) {
  return (
    <div className="playlist">
      <input
        value={name}
        onChange={(e) => onNameChange?.(e.target.value)}
        placeholder="Playlist name"
      />
      <Tracklist tracks={tracks} actionLabel="-" onAction={onRemove} />
      <button onClick={onSave}>Save to Spotify</button>
    </div>
  );
}

export default Playlist;
