export interface AudioPort {
    play(): Promise<void>;

    pause(): Promise<void>;

    seekTo(ms: number): Promise<void>;
}