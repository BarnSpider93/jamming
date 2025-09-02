import Track from "./Track.js";

function Tracklist({ tracks = [], actionLabel, onAction }) {
  return (
    <div>
      {tracks.map((t) => (
        <Track
          key={t.id}
          track={t}
          actionLabel={actionLabel}
          onAction={onAction}
        />
      ))}
    </div>
  );
}

export default Tracklist;
