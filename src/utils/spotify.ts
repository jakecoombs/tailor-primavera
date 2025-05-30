export function getAccessToken() {
  return localStorage.getItem('spotifyAccessToken');
}

export async function fetchFollowedArtists() {
  const accessToken = localStorage.getItem('spotifyAccessToken');
  if (!accessToken) {
    throw new Error('Access token is not available');
  }

  let followedArtists = [];

  const response = await fetch('https://api.spotify.com/v1/me/following?type=artist&limit=50', {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })
  if (!response.ok) {
    throw new Error('Failed to fetch followed artists');
  }
  const initialData = await response.json();
  followedArtists.push(initialData.artists.items);
  if (initialData.artists.next) {
    let nextUrl = initialData.artists.next;
    while (nextUrl) {
      const nextResponse = await fetch(nextUrl, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      if (!nextResponse.ok) {
        throw new Error('Failed to fetch followed artists');
      }
      const nextData = await nextResponse.json();
      followedArtists.push(nextData.artists.items);
      nextUrl = nextData.artists.next;
    }
  }
  return followedArtists.flat();
}