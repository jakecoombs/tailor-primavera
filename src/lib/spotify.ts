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

export async function exportLikedSongsToPlaylist(likedSongs: any[]): Promise<string> {
  if (!likedSongs || likedSongs.length === 0) {
    throw new Error('No liked songs to export');
  }
  const accessToken = getAccessToken();
  if (!accessToken) {
    throw new Error('Access token is not available');
  }
  const headers = {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    }
  }
  // Get the user ID
  const userResponse = await fetch(`${SPOTIFY_API_BASE_URL}/me`, headers);
  if (!userResponse.ok) {
    throw new Error('Failed to fetch user data');
  }
  const userData = await userResponse.json();
  const userId = userData.id;

  // Create a playlist
  const createPlaylistResponse = await fetch(`${SPOTIFY_API_BASE_URL}/users/${userId}/playlists`, {
    method: 'POST',
    headers: {
      ...headers.headers,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: 'Your Liked Songs of Primavera 2025',
      description: 'A playlist of your liked songs by artists attending Primavera Sound festival 2025',
      public: false,
    }),
  });
  if (!createPlaylistResponse.ok) {
    throw new Error('Failed to create playlist');
  }
  const playlistData = await createPlaylistResponse.json();
  const playlistId = playlistData.id;
  const playlistUrl = playlistData.external_urls.spotify;

  // Add songs to playlist
  const trackUris = likedSongs.map((track: any) => track.uri);
  if (trackUris.length > 0) {
    // Spotify API allows adding up to 100 tracks at a time
    const chunkSize = 100;
    for (let i = 0; i < trackUris.length; i += chunkSize) {
      const chunk = trackUris.slice(i, i + chunkSize);

      const addTracksResponse = await fetch(`${SPOTIFY_API_BASE_URL}/playlists/${playlistId}/tracks`, {
        method: 'POST',
        headers: {
          ...headers.headers,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          uris: chunk,
        }),
      });
      if (!addTracksResponse.ok) {
        throw new Error('Failed to add tracks to playlist');
      }
    }
  }
 
  // Return the playlist URL
  return playlistUrl;
}