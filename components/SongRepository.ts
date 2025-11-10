import Song from "@/components/Song";

export default interface SongRepository {
    addSong(song: Song): Promise<void>;

    addSongs(songs: Song[]): Promise<void>;

    loadSongs(): Promise<Song[]>;

    clear(): Promise<void>;
}

