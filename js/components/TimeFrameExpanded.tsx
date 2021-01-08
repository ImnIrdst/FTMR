import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

interface Props {}

export enum TimerAction {
    Free,
    Start,
}

export class TimeFrameExpanded extends React.Component<Props> {
    tags = ["Tag#1", "Tag#1"];
    todos = [
        "- Add todos and checkboxes",
        "- Add cross line on done todos",
        "- Add timeframe list",
        "- Add timeframe list",
        "- Add timeframe list",
        "- Add timeframe list",
        "- Add timeframe list",
        "- Add timeframe list",
        "- Add timeframe list",
        "- Add timeframe list",
        "- Add timeframe list",
        "- Add timeframe list",
        "- Add timeframe list",
        "- Add buttons for sound profile",
        "- Add tag manager screen",
    ];

    tagsFormatted = () => this.tags.join(", ");

    render = () => (
        <ScrollView style={styles.fillWidth}>
            <View style={styles.container}>
                <Text style={styles.title}>{this.tagsFormatted()}</Text>
                {this.todos.map((todo) => {
                    return <Text style={styles.body}>{todo}</Text>;
                })}
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    fillWidth: {
        flex: 1,
        alignSelf: "stretch",
    },
    container: {
        alignSelf: "stretch",
        backgroundColor: "red",
        flex: 1,
        alignItems: "flex-start",
    },
    title: {
        alignSelf: "stretch",
        flex: 1,
        margin: 2,
        textAlignVertical: "center",
        textAlign: "center",
        backgroundColor: "green",
        padding: 32,
        fontSize: 32,
        color: "#eee",
    },
    body: {
        flex: 1,
        margin: 2,
        textAlignVertical: "center",
        backgroundColor: "green",
        padding: 16,
        fontSize: 16,
        color: "#eee",
    },
});
