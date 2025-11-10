import React from "react";
import {Button, StyleSheet, Text, View} from 'react-native';
import {useAudioPlayer, useAudioPlayerStatus} from 'expo-audio';
import Pearls from "@/assets/Pearls.mp3"

const audioSource = Pearls;

export default function App() {
    const player = useAudioPlayer(audioSource);
    const status = useAudioPlayerStatus(player);

    return (
        <View style={styles.container}>
            <Button title="Play Sound" onPress={() => player.play()}/>
            <Button
                title="Replay Sound"
                onPress={() => {
                    player.seekTo(0);
                    player.play();
                    console.log("button press");
                }}
            />
            <Text>
                {!status?.isLoaded ? "Loading…" : status.isBuffering ? "Buffering…" : status.playing ? "Playing" : "Paused"}
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#ecf0f1',
        padding: 10,
    },
});