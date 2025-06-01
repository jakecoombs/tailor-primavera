// Show list of followed artists attending Primavera Sound festival

import React from "react";
import { fetchAttendingArtists } from "../lib/spotify";
import ArtistList from "./ArtistList";


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
        <ArtistList artists={data} />
  );
}
export default YourAttendingArtists;