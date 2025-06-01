const TrackList = ({ tracks }: { tracks: any }) => {
  return (
    <ul style={{ listStyleType: "none", padding: 0 }}>
      {tracks.map((track: any) => (
        <a
          href={track.external_urls.spotify}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            textDecoration: "none",
            color: "#1DB954",
          }}
        >
          <li
            key={track.id}
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "10px",
            }}
          >
            <img
              src={track.album.images[0]?.url}
              alt={track.name}
              width="50"
              style={{ marginRight: "10px" }}
            />
            <div>
              <span>
                <strong>{track.name}</strong>
              </span>
              <div>
                {track.artists.map((artist: any, index: number) => (
                  <span key={artist.id}>
                    {artist.name}
                    {index < track.artists.length - 1 ? ", " : ""}
                  </span>
                ))}
              </div>
            </div>
          </li>
        </a>
      ))}
    </ul>
  );
};

export default TrackList;
