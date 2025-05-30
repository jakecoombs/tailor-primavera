import React from 'react';
import { redirectToSpotifyLogin } from '../auth/spotifyAuth';

function isLoggedIn() {
  const accessToken = localStorage.getItem("spotifyAccessToken");
  return accessToken !== null && accessToken !== undefined && accessToken !== '';
}

function Home() {
  if (!isLoggedIn()) {
    return (
      <>

        <h1>Please Login to Spotify</h1>
        <button onClick={redirectToSpotifyLogin}>
          Log in
        </button>
      </>
    );
  }

  return (
    <>
      <h1>
      Tailor your Primavera Experience with Spotify
      </h1>
    </>
  );
}

export default Home;
