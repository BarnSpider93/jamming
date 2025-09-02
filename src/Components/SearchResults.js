import Tracklist from "./Tracklist.js";

function SearchResults({ tracks, onAdd}) {
  return (
    <div className="results">
      <h2>Results</h2>
      <Tracklist tracks={tracks} actionLabel="+" onAction={onAdd} />
    </div>
  );
}

export default SearchResults;
