import React, {useEffect, useState} from "react";
import {Button, Text, View} from "react-native";
import {SafeAreaProvider} from "react-native-safe-area-context";
import {useAudioPlayer, useAudioPlayerStatus} from "expo-audio";
import library from "@/assets/library.json";
import SongList from "@/components/SongList";
import {StatusBar} from "expo-status-bar";

const songs = library.map((item, index) => ({...item, id: index.toString()}));

export default function App() {
    const [currentUrl, setCurrentUrl] = useState<string | null>(null);
    const player = useAudioPlayer(currentUrl ?? undefined);
    const status = useAudioPlayerStatus(player);

    useEffect(() => {
        if (currentUrl) {
            player.play();
        }
    }, [currentUrl, player]);

    return (
        <SafeAreaProvider>
            <SongList
                songs={songs}
                currentUrl={currentUrl}
                onPress={(uri) => setCurrentUrl(uri)}
            />

            <View style={{padding: 20}}>
                <Button title="Play" onPress={() => player.play()}/>
                <Button title="Pause" onPress={() => player.pause()}/>
                <Button
                    title="Replay"
                    onPress={() => {
                        player.seekTo(0);
                        player.play();
                    }}
                />

                <Text style={{textAlign: "center", marginTop: 10}}>
                    {status.isBuffering
                        ? "Buffering…"
                        : status.playing
                            ? "Playing"
                            : "Paused"}
                </Text>
                <StatusBar></StatusBar>
            </View>
        </SafeAreaProvider>
    );
}