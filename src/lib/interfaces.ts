export interface PrimaveraLineup {
    data: {
      getLineupEvent: {
        artists: PrimaveraArtist[];
      };
    };
  }
  
  export interface PrimaveraArtist {
    fontRatio: number | null;
    artistSlugName: string;
    artistName: string;
    artistReadableName: string | null;
    image: {
      es: string | null;
      en: string | null;
      ca: string | null;
    };
    postUri: string;
    duration: number;
    venues: Venue[];
  }
  
  export interface Venue {
    duration: number;
    venueSlugName: string;
    artistSetSlugName: string;
    artistSetName: string;
    artistSetGenres: string[] | null;
    artistSetIsFavorite: boolean;
    shortTitle: {
      es: string | null;
      en: string | null;
      ca: string | null;
    };
    smallText: {
      es: string;
      en: string;
      ca: string;
    };
    artistSetReadableName: {
      es?: string;
      en?: string;
      ca?: string;
    };
    image: {
      es: string | null;
      en: string | null;
      ca: string | null;
    };
    dateTimeStartReal: string;
    dateTimeStartHuman: string;
  }