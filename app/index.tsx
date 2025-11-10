import React, {useEffect, useState} from "react";
import { FlatList, Text, TouchableOpacity, Button, View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useAudioPlayer, useAudioPlayerStatus } from "expo-audio";
import styles from "@/constants/styles";
import library from "@/assets/library.json";

const DATA = library.map((item, index) => ({ ...item, id: index.toString() }));

export default function App() {
    const [currentUrl, setCurrentUrl] = useState<string | null>(null);
    const player = useAudioPlayer(currentUrl ?? undefined);
    const status = useAudioPlayerStatus(player);

    const handleSelect = (url: string) => {
        setCurrentUrl(url);
    };

    useEffect(() => {
        if (currentUrl) {
            player.play();
        }
    }, [currentUrl, player]);

    return (
        <SafeAreaProvider>
            <FlatList
                data={DATA}
                keyExtractor={(item) => item.id}
                contentContainerStyle={{ padding: 10 }}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={[
                            styles.item,
                            currentUrl === item.uri && { backgroundColor: "#ccc" },
                        ]}
                        onPress={() => handleSelect(item.uri)}
                    >
                        <Text style={styles.title}>{item.title}</Text>
                    </TouchableOpacity>
                )}
            />

            <View style={{ padding: 20 }}>
                <Button title="Play" onPress={() => player.play()} />
                <Button title="Pause" onPress={() => player.pause()} />
                <Button
                    title="Replay"
                    onPress={() => {
                        player.seekTo(0);
                        player.play();
                    }}
                />
                <Text style={{ textAlign: "center", marginTop: 10 }}>
                    {status.isBuffering
                        ? "Buffering…"
                        : status.playing
                            ? "Playing"
                            : "Paused"}
                </Text>
            </View>
        </SafeAreaProvider>
    );
}
