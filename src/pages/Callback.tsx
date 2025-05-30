import { Navigate, useSearchParams } from "react-router-dom";
import { SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET, SPOTIFY_REDIRECT_URI } from "../lib/consts";
import React from "react";

async function loginToSpotify(code:string) {
    const headers = {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Basic ' + btoa(`${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`)
    };
    
    const body = new URLSearchParams({
        code: code,
        redirect_uri: SPOTIFY_REDIRECT_URI,
        grant_type: 'authorization_code'
    });
    const response = await fetch("https://accounts.spotify.com/api/token", {
        method: "POST",
        headers: headers,
        body: body,
    });

    if (!response.ok) {
        throw new Error("Failed to log in to Spotify");
    }

    const data = await response.json();
    if (!data.access_token) {
        throw new Error("No access token received from Spotify");
    }
    // Store the access token in localStorage or handle it as needed
    localStorage.setItem("spotifyAccessToken", data.access_token);
}

const Callback = () => {
    const [searchParams,] = useSearchParams();
    const [isLoading, setIsLoading] = React.useState(true);
    const code = searchParams.get("code");

    React.useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await loginToSpotify(code!);
                console.log("Login data:", data);
            } catch (error) {
                console.error(error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [code]);

    if (isLoading) {
        return <h1>Loading...</h1>;
    }
    
    return <Navigate to="/" replace />;
  };
  
export default Callback;
  