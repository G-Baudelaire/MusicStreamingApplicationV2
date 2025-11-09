import {Track} from 'react-native-track-player'
import TrackRepository from '@/components/TrackRepository'
import AsyncStorageTrackRepository from '@/components/AsyncStorageTrackRepository'
import AsyncStorageKeys from '@/constants/AsyncStorageKeys'
import library from '@/assets/library.json'
import FakeTrackRepository from "@/components/FakeTrackRepository";

const runRepositoryTests = (label: string, repoFactory: () => TrackRepository) => {
    describe(label, () => {
        let trackRepository: TrackRepository
        const libraryTracks: Track[] = library as Track[]
        const track: Track = library[0] as Track

        beforeAll(async () => {
            trackRepository = repoFactory()
        })

        afterEach(async () => {
            await trackRepository.clear()
        })

        it('should add track', async () => {
            await trackRepository.addTrack(track)
            const loadedTracks: Track[] = await trackRepository.loadTracks()
            expect(new Set(loadedTracks)).toEqual(new Set([track]))
        })

        it('should add tracks', async () => {
            await trackRepository.addTracks(libraryTracks)
            const loadedTracks: Track[] = await trackRepository.loadTracks()
            expect(new Set(loadedTracks)).toEqual(new Set(libraryTracks))
        })
    })
}

runRepositoryTests('FakeStorageTrackRepository', getFakeTrackRepository)
runRepositoryTests('AsyncStorageTrackRepository', getAsyncStorageTrackRepository)

function getFakeTrackRepository(): FakeTrackRepository {
    return new FakeTrackRepository()
}

function getAsyncStorageTrackRepository(): AsyncStorageTrackRepository {
    return new AsyncStorageTrackRepository(AsyncStorageKeys.testLibrary)
}
