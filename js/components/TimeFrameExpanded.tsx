import React from "react";
import { StyleSheet, Text, View } from "react-native";

interface Props {}

export enum TimerAction {
    Free,
    Start,
}

export class TimeFrameExpanded extends React.Component<Props> {
    tags = ["Tag#1", "Tag#1"];

    tagsFormatted = () => this.tags.join(", ");

    render = () => (
        <View style={styles.container}>
            <Text style={styles.body}>{this.tagsFormatted()}</Text>
            <Text style={styles.body}>{this.tagsFormatted()}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "red",
        flex: 1,
        alignItems: "flex-start",
    },
    body: {
        margin:   2,
        textAlignVertical: "center",
        backgroundColor: "green",
        padding: 32,
        fontSize: 32,
        color: "#eee",
    },
});
