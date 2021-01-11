import React from "react";
import { StyleSheet, Text, View, ViewStyle } from "react-native";
import { TimeFrameData } from "./TimeFrameData";

interface Props extends TimeFrameData {
    style: ViewStyle;
}
export class TimeFrameItemUI extends React.Component<Props> {
    // componentDidMount() {
    //     console.log(timezone)
    // }

    getTags = () => this.props.tags.join(", ");
    getTodos = () => this.props.todos;
    getTimeRange = () => this.props.getStartTime() + " - " + this.props.getEndTime();

    render = () => (
        <View style={this.props.style}>
            <Text style={styles.title}>{this.getTags()}</Text>
            <Text style={styles.timeRange}>{this.getTimeRange()}</Text>
            {this.getTodos().map((todo) => (
                <Text key={todo.key} style={styles.todo}>
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
});
