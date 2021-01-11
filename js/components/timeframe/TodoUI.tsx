import React from "react";
import { StyleSheet, Text, View, ViewStyle } from "react-native";
import { Todo } from "./TimeFrameData";

interface Props {
    style: ViewStyle;
    todo: Todo;
}
export class TodoUI extends React.Component<Props> {
    getKey = () => this.props.todo.key;
    getText = () => this.props.todo.text;

    getTodoStateStyle = () => (this.props.todo.isChecked ? styles.isDone : styles.isUnDone);

    render = () => (
        <View key={this.getKey()} style={this.props.style}>
            <Text style={[styles.todo, this.getTodoStateStyle()]}>{this.getText()}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    todo: {
        flex: 1,
        margin: 2,
        textAlignVertical: "center",
        marginHorizontal: 8,
        fontSize: 16,
        color: "#eee",
    },
    isDone: {
        textDecorationLine: "line-through",
    },

    isUnDone: {
        textDecorationLine: "none",
    },
});
