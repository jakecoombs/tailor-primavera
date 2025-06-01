import { redirectToSpotifyLogin } from "../auth/spotifyAuth";
import LikedSongsAttending from "../components/LikedSongsAttending";
import { useDocumentTitle } from "../lib/utils";

function isLoggedIn() {
  const accessToken = localStorage.getItem("spotifyAccessToken");
  return (
    accessToken !== null && accessToken !== undefined && accessToken !== ""
  );
}

function Home() {
  useDocumentTitle("Sastre de Primavera - Tailor of Primavera");
  if (!isLoggedIn()) {
    return (
      <>
        <h1>Please Login to Spotify</h1>
        <button onClick={redirectToSpotifyLogin}>Log in</button>
      </>
    );
  }

  return (
    <>
      <h1>Tailor your Primavera Experience with Spotify</h1>
      <h2>Liked Songs by Artists Attending Primavera</h2>
      <LikedSongsAttending />
    </>
  );
}

export default Home;
