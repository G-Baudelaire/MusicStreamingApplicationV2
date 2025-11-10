import {FlatList, FlatListProps, Text, TouchableOpacity} from "react-native";
import Song from "@/components/Song";
import styles from "@/constants/styles";
import React from "react";

export interface SongListProperties extends FlatListProps<Song> {
    songs: Song[];
}


interface SongListProps {
    songs: Song[];
    currentUrl: string | null;
    onPress: (uri: string) => void;
}

export default function SongList({ songs, currentUrl, onPress }: SongListProps) {
    return (
        <FlatList
            data={songs}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
                <TouchableOpacity
                    style={[
                        styles.item,
                    ]}
                    onPress={() => onPress(item.uri)}
                >
                    <Text style={styles.title}>{item.title}</Text>
                </TouchableOpacity>
            )}
        />
    );
}