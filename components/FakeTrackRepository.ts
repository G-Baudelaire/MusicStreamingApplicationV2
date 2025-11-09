import {Track} from "react-native-track-player";
import TrackRepository from "@/components/TrackRepository";

export default class FakeTrackRepository implements TrackRepository {
    private tracks: Track[] = [];

    async loadTracks(): Promise<Track[]> {
        return this.tracks;
    }

    async addTrack(track: Track): Promise<void> {
        this.tracks.push(track);
    }

    async addTracks(tracks: Track[]): Promise<void> {
        this.tracks.push(...tracks);
    }

    async clear(): Promise<void> {
        this.tracks = [];
    }

}