import SongRepository from '@/components/SongRepository'
import AsyncStorageSongRepository from '@/components/AsyncStorageSongRepository'
import AsyncStorageKeys from '@/constants/AsyncStorageKeys'
import library from '@/assets/library.json'
import FakeSongRepository from "@/components/FakeSongRepository";
import Song from "@/components/Song";

const runRepositoryTests = (label: string, repoFactory: () => SongRepository) => {
    describe(label, () => {
        let songRepository: SongRepository
        const librarySongs: Song[] = library as Song[]
        const song: Song = library[0] as Song

        beforeAll(async () => {
            songRepository = repoFactory()
        })

        afterEach(async () => {
            await songRepository.clear()
        })

        it('should add song', async () => {
            await songRepository.addSong(song)
            const loadedSongs: Song[] = await songRepository.loadSongs()
            expect(new Set(loadedSongs)).toEqual(new Set([song]))
        })

        it('should add songs', async () => {
            await songRepository.addSongs(librarySongs)
            const loadedSongs: Song[] = await songRepository.loadSongs()
            expect(new Set(loadedSongs)).toEqual(new Set(librarySongs))
        })
    })
}

runRepositoryTests('FakeStorageSongRepository', getFakeSongRepository)
runRepositoryTests('AsyncStorageSongRepository', getAsyncStorageSongRepository)

function getFakeSongRepository(): FakeSongRepository {
    return new FakeSongRepository()
}

function getAsyncStorageSongRepository(): AsyncStorageSongRepository {
    return new AsyncStorageSongRepository(AsyncStorageKeys.testLibrary)
}
