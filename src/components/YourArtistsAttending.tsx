// Show list of followed artists attending Primavera Sound festival

import React from "react";
import { fetchAttendingArtists } from "../utils/spotify";


const YourAttendingArtists = () => {
    const [isLoading, setIsLoading] = React.useState(true);
    const [data, setData] = React.useState<any>([]);
    

    React.useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await fetchAttendingArtists();
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
        return <div>No artists you follow are attending Primavera.</div>; 
    }
    
  return (
    <div>
      <h2>Your Followed Artists Attending Primavera ({data.length})</h2>
        <ul>
            {data.map((artist: any) => (
            <li key={artist.id}>
                <img src={artist.images[0]?.url} alt={artist.name} width="50" />
                <a href={artist.external_urls.spotify} target="_blank" rel="noopener noreferrer">
                {artist.name}
                </a>
            </li>
            ))}
        </ul>   
    </div>
  );
}
export default YourAttendingArtists;