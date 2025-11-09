import {Track} from "react-native-track-player";
import TrackRepository from "@/components/TrackRepository";
import AsyncStorage from "@react-native-async-storage/async-storage"

export default class AsyncStorageTrackRepository implements TrackRepository {
    protected readonly tracksKey: string;

    constructor(tracksKey: string) {
        this.tracksKey = tracksKey;
    }

    async addTrack(track: Track) {
        const currentTracks: Track[] = await this.loadTracks()
        const updated = [...currentTracks, track]
        await AsyncStorage.setItem(this.tracksKey, JSON.stringify(updated))
    }

    async addTracks(tracks: Track[]): Promise<void> {
        const currentTracks: Track[] = await this.loadTracks()
        const updated = [...currentTracks, ...tracks]
        await AsyncStorage.setItem(this.tracksKey, JSON.stringify(updated))
    }

    async loadTracks(): Promise<Track[]> {
        const data: string = await this.getFromAsyncStore();
        return JSON.parse(data);
    }

    async getFromAsyncStore(): Promise<string> {
        const data: string | null = await AsyncStorage.getItem(this.tracksKey)
        return data ?? '[]'
    }

    async clear(): Promise<void> {
        await AsyncStorage.removeItem(this.tracksKey);
    }
}
