function Track({ track, actionLabel, onAction }) {
  return (
    <div>
      <div className="trackInfo">
        <strong>{track.name}</strong>
        <div>
          {track.artist} | {track.album}
        </div>
      </div>
      {actionLabel && (
        <button onClick={() => onAction?.(track)}>{actionLabel}</button>
      )}
    </div>
  );
}

export default Track;
