import React from "react";
import { StyleSheet, Text } from "react-native";

interface Props {}

export enum TimerAction {
    Free,
    Start,
}

export class TimeFrameExpanded extends React.Component<Props> {
    tags = ["Tag#1", "Tag#1"];

    tagsFormatted = () => this.tags.join(", ");

    render = () => <Text style={styles.body}>{this.tagsFormatted()}</Text>;
}

const styles = StyleSheet.create({
    body: {
        textAlignVertical: "center",
        flex: 1,
        padding: 32,
        fontSize: 32,
        color: "#eee",
    },
});
