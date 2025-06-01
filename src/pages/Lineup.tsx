import ArtistList from "../components/ArtistList";
import { performingArtists } from "../lib/primavera";
import { useDocumentTitle } from "../lib/utils";

function Lineup() {
    useDocumentTitle("Primavera Sound 2025 Lineup - Tailor of Primavera");
    const lineupData = performingArtists();
    const artists = lineupData.map(artists => ({
        id: artists.artistSlugName,
        name: artists.artistName,
        images: [{url: artists.image.en ?? "https://via.placeholder.com/150"}],
        external_urls: {
            spotify: `https://www.primaverasound.com/en/lineup/${artists.artistSlugName}`
        }
    }))

  return (
    <>
      <h1>Your Primavera 2025 Lineup</h1>
      <ArtistList artists={artists} />
    </>
  );
}

export default Lineup;
