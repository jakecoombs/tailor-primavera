import React from "react";
import { fetchLikedSongsByAttendees } from "../lib/spotify";
import ExportSongsButton from "./ExportSongsButton";
import TrackList from "./TrackList";


const LikedSongsAttending = () => {
    const [active, setIsActive] = React.useState(false);
    const [isLoading, setIsLoading] = React.useState(false);
    const [data, setData] = React.useState<any>([]);

    React.useEffect(() => {
        if (!active) {
            return;
        }
        setIsLoading(true);
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
    }, [active]);

    if (!active) {
        return <button onClick={() => setIsActive(true)}>Load liked songs</button>
    }

    if (isLoading) {
        return <div>Loading...</div>;
    }
    
    if (data.length === 0) {
        return <div>No liked songs by Artists @ Primavera.</div>; 
    }
    
  return (
    <div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <h3>Your Liked Songs by Attendees ({data.length})</h3>
            <ExportSongsButton songs={data} />
        </div>
        <TrackList tracks={data} />  
    </div>
  );
}
export default LikedSongsAttending;