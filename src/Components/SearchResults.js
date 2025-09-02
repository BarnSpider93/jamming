function SearchResults({ results }) {
  return (
    <div className='results'>
      <h2>Results</h2>
      {results.map(track => (
        <div key={track.id}>
          {track.name} - {track.artist}
        </div>
      ))}
    </div>
  );
}


export default SearchResults