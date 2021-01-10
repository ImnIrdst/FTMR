import React from "react";
import { StyleSheet, Text, View, ViewStyle } from "react-native";
import { TimeFrameData } from "./TimeFrameData";

interface Props extends TimeFrameData {
    style: ViewStyle;
}
export class TimeFrameItemUI extends React.Component<Props> {
    getTags = () => this.props.tags.join(", ");
    getTodos = () => this.props.todos;

    render = () => (
        <View style={this.props.style}>
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
    title: {
        alignSelf: "stretch",
        flex: 1,
        textAlignVertical: "center",
        margin: 8,
        fontSize: 32,
        color: "#eee",
    },
    body: {
        flex: 1,
        margin: 2,
        textAlignVertical: "center",
        marginHorizontal: 8,
        fontSize: 16,
        color: "#eee",
    },
});
