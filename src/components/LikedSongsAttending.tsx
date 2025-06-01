import React from "react";
import { fetchLikedSongsByAttendees } from "../lib/spotify";
import ExportSongsButton from "./ExportSongsButton";


const LikedSongsAttending = () => {
    const [isLoading, setIsLoading] = React.useState(true);
    const [data, setData] = React.useState<any>([]);
    

    React.useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await fetchLikedSongsByAttendees();
                setData(data);
            } catch (error) {
                console.error(error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    if (isLoading) {
        return <div>Loading...</div>;
    }
    
    if (data.length === 0) {
        return <div>No liked songs by Artists @ Primavera.</div>; 
    }
    
  return (
    <div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <h2>Liked Songs by Attendees({data.length})</h2>
            <ExportSongsButton songs={data} />
        </div>
        <ul>
            {data.map((track: any) => (
            <li key={track.id}>
                <img src={track.album.images[0]?.url} alt={track.name} width="50" />
                <a href={track.external_urls.spotify} target="_blank" rel="noopener noreferrer">
                {track.name}
                </a>
            </li>
            ))}
        </ul>   
    </div>
  );
}
export default LikedSongsAttending;