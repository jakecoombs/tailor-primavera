import { PrimaveraArtist, PrimaveraLineup } from "./interfaces";

export const performingArtists = (): Array<PrimaveraArtist> => {
    // Get all artist names from primaveralineup.json
    const primaveraLineup: PrimaveraLineup = require('../data/primaveralineup.json');
    return primaveraLineup.data.getLineupEvent.artists;
}