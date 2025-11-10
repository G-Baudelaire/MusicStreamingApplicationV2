import SongRepository from "@/components/SongRepository";
import AsyncStorage from "@react-native-async-storage/async-storage"
import Song from "@/components/Song";

export default class AsyncStorageSongRepository implements SongRepository {
    protected readonly songsKey: string;

    constructor(songsKey: string) {
        this.songsKey = songsKey;
    }

    async addSong(song: Song) {
        const currentSongs: Song[] = await this.loadSongs()
        const updated = [...currentSongs, song]
        await AsyncStorage.setItem(this.songsKey, JSON.stringify(updated))
    }

    async addSongs(songs: Song[]): Promise<void> {
        const currentSongs: Song[] = await this.loadSongs()
        const updated = [...currentSongs, ...songs]
        await AsyncStorage.setItem(this.songsKey, JSON.stringify(updated))
    }

    async loadSongs(): Promise<Song[]> {
        const data: string = await this.getFromAsyncStore();
        return JSON.parse(data);
    }

    async getFromAsyncStore(): Promise<string> {
        const data: string | null = await AsyncStorage.getItem(this.songsKey)
        return data ?? '[]'
    }

    async clear(): Promise<void> {
        await AsyncStorage.removeItem(this.songsKey);
    }
}
