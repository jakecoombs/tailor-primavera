import { SPOTIFY_API_BASE_URL } from "../lib/consts";
import { performingArtists } from "../lib/primavera";

export function getAccessToken() {
  return localStorage.getItem('spotifyAccessToken');
}

export async function fetchFollowedArtists() {
    const accessToken = getAccessToken();
  if (!accessToken) {
    throw new Error('Access token is not available');
  }

  let followedArtists = [];
  let nextUrl = `${SPOTIFY_API_BASE_URL}/me/following?type=artist&limit=50`;

  while (nextUrl) {
    const response = await fetch(nextUrl, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch playlist tracks');
    }

    const data = await response.json();
    followedArtists.push(...data.artists.items)

    nextUrl = data.artists.next;
  }
  return followedArtists;
}

export async function fetchAttendingArtists() {
    const followedArtists = await fetchFollowedArtists();
    console.log("Followed Artists:", followedArtists);
    if (!followedArtists || followedArtists.length === 0) {
        return [];
    }
    const artistsAttending = performingArtists();
    console.log("Artists Attending:", artistsAttending);
    const attendingArtists = followedArtists.filter(artist =>
        artistsAttending.some(attending => attending.artistName === artist.name)
    );
    return attendingArtists;
}