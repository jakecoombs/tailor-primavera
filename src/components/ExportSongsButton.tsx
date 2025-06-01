import React from "react";
import { exportLikedSongsToPlaylist } from "../lib/spotify";


const ExportSongsButton = ({songs}: {songs: any[]}) => {
    const [isExporting, setIsExporting] = React.useState(false);
    const [playlistUrl, setPlaylistUrl] = React.useState<string>();

    if (isExporting) {
        return <div>Exporting...</div>;
    }
    
    if (songs.length === 0) {
        return <div>No songs to export...</div>; 
    }

    if (playlistUrl) {
      <button onClick={() => window.location.href = playlistUrl}>Go to playlist of exported songs</button>
    } 

    const handleExport = async () => {
        setIsExporting(true);
        try {
          const playlistUrl = await exportLikedSongsToPlaylist(songs);
          setPlaylistUrl(playlistUrl);
          alert(`Playlist created successfully! You can find it here: ${playlistUrl}`);
        }
        catch (error) {
            console.error('Error exporting songs:', error);
        } finally {
            setIsExporting(false);
        }
    };
    
    

  return (
    <button onClick={handleExport}>Export Songs to New Playlist</button>
  );
}
export default ExportSongsButton;