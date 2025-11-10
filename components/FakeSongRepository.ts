import SongRepository from "@/components/SongRepository";
import Song from "@/components/Song";

export default class FakeSongRepository implements SongRepository {
    private tracks: Song[] = [];

    async loadSongs(): Promise<Song[]> {
        return this.tracks;
    }

    async addSong(track: Song): Promise<void> {
        this.tracks.push(track);
    }

    async addSongs(tracks: Song[]): Promise<void> {
        this.tracks.push(...tracks);
    }

    async clear(): Promise<void> {
        this.tracks = [];
    }

}