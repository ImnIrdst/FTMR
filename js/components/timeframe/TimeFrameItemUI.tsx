import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { TimeFrameData } from "./TimeFrameData";

interface Props extends TimeFrameData {}
export class TimeFrameItemUI extends React.Component<Props> {
    getTags = () => this.props.tags.join(", ");
    getTodos = () => this.props.todos;

    render = () => (
        <View style={styles.container}>
            <Text style={styles.title}>{this.getTags()}</Text>
            {this.getTodos().map((todo) => (
                <Text key={todo.key} style={styles.body}>
                    {todo.text}
                </Text>
            ))}
        </View>
    );
}

const styles = StyleSheet.create({
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
