import {Track} from "react-native-track-player";

export default interface TrackRepository {
    addTrack(track: Track): Promise<void>;

    addTracks(tracks: Track[]): Promise<void>;

    loadTracks(): Promise<Track[]>;

    clear(): Promise<void>;
}

