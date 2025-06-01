interface Artist {
  id: string;
  name: string;
  images: { url: string }[];
  external_urls: { spotify: string };
}

const ArtistList = ({ artists }: { artists: Artist[] }) => {
  return (
    <ul style={{ listStyleType: "none", padding: 0 }}>
      {artists.map((artist: any) => (
        <a
          href={artist.external_urls.spotify}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            textDecoration: "none",
            color: "#1DB954",
          }}
        >
          <li
            key={artist.id}
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "10px",
            }}
          >
            <img
              src={artist.images[0]?.url}
              alt={artist.name}
              width="50"
              style={{ marginRight: "10px" }}
            />
            <div>
              <strong>{artist.name}</strong>
            </div>
          </li>
        </a>
      ))}
    </ul>
  );
};

export default ArtistList;
