import YourAttendingArtists from "../components/YourArtistsAttending";
import { useDocumentTitle } from "../lib/utils";

function YourArtists() {
    useDocumentTitle("Your Artists Attending Primavera - Tailor of Primavera");
  return (
    <>
      <h1>Your Following Artists Attending Primavera</h1>
      <YourAttendingArtists />
    </>
  );
}

export default YourArtists;
