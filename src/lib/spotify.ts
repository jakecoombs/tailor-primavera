import { SPOTIFY_API_BASE_URL } from "./consts";
import { performingArtists } from "./primavera";

export function getAccessToken() {
  return localStorage.getItem('spotifyAccessToken');
}

export async function fetchFollowedArtists() {
    const accessToken = getAccessToken();
  if (!accessToken) {
    throw new Error('Access token is not available');
  }

  const followedArtists = [];
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

export async function fetchLikedSongsByAttendees() {
  const accessToken = getAccessToken();
  if (!accessToken) {
    throw new Error('Access token is not available');
  }  
  const attendingArtistNames = performingArtists().map(artist => artist.artistName);

  const likedSongsByAttendees: any[] = [];
  let nextUrl = `${SPOTIFY_API_BASE_URL}/me/tracks?limit=50`;

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
    data.items.forEach((item: any) => { 
      const track = item.track;
      if (track && track.artists) {
        const artists = track.artists.map((artist: any) => artist.name);
        if (artists.some((artist: any) => attendingArtistNames.includes(artist))) {
          likedSongsByAttendees.push(track);
        }
      }
    })

    nextUrl = data.next;
  }
  return likedSongsByAttendees;
}