function generateRandomString(length: number): string {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}

export async function redirectToSpotifyLogin() {
  const client_id = process.env.REACT_APP_SPOTIFY_CLIENT_ID!;
  const redirect_uri = process.env.REACT_APP_REDIRECT_URI!;
  const state = generateRandomString(16);
  const scope = 'user-read-private user-read-email user-follow-read user-library-read playlist-modify-public playlist-modify-private';

  const params = new URLSearchParams({
    response_type: 'code',
    client_id,
    scope,
    redirect_uri,
    state
  });

  window.location.href = `https://accounts.spotify.com/authorize?${params.toString()}`;
}
