import React from "react";
import { StyleSheet, Text, View, ViewStyle } from "react-native";
import { TimeFrameData, Todo } from "./TimeFrameData";
import { ToggleButtonUI } from "./ToggleButtonUI";
import { TodoUI } from "./TodoUI";

interface Props extends TimeFrameData {
    style: ViewStyle;
}
export class TimeFrameItemUI extends React.Component<Props> {
    getTags = () => this.props.tags.join(", ");
    getTodos = () => this.props.todos;
    getTimeRange = () => this.props.getStartTime() + " - " + this.props.getEndTime();

    doNothing = () => {};

    // Todo extract this
    getTodoStateStyle = () => {};

    render = () => (
        <View style={this.props.style}>
            <Text style={styles.title}>{this.getTags()}</Text>
            <Text style={styles.timeRange}>{this.getTimeRange()}</Text>
            {this.getTodos().map((todo) => (
                <TodoUI key={todo.key} style={styles.todo} todo={todo} />
            ))}
            <View style={styles.buttonsContainer}>
                <ToggleButtonUI style={styles.button} icon={"alarm"} onToggle={this.doNothing} />
                <ToggleButtonUI style={styles.button} icon={"bell-outline"} onToggle={this.doNothing} />
                <ToggleButtonUI style={styles.button} icon={"tag-multiple-outline"} onToggle={this.doNothing} />
                <ToggleButtonUI style={styles.button} icon={"pencil-outline"} onToggle={this.doNothing} />
                <ToggleButtonUI style={styles.button} icon={"alert-octagon-outline"} onToggle={this.doNothing} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    title: {
        alignSelf: "stretch",
        flex: 1,
        textAlignVertical: "center",
        margin: 8,
        fontSize: 24,
        color: "#eee",
    },
    timeRange: {
        fontSize: 14,
        color: "#eee",
        marginHorizontal: 16,
        marginBottom: 16,
    },
    todo: {
        flex: 1,
        margin: 2,
        textAlignVertical: "center",
        marginHorizontal: 8,
        fontSize: 16,
        color: "#eee",
    },
    buttonsContainer: {
        marginTop: 16,
        flexDirection: "row",
    },
    button: {
        alignSelf: "center",
    },
});
