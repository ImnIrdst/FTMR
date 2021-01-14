import React from "react";
import {StyleSheet, Text, View, ViewStyle} from "react-native";
import {TimeFrameData} from "./TimeFrameData";
import {ToggleButtonUI} from "../button/ToggleButtonUI";
import {TodoUI} from "./TodoUI";
import {ToolbarButtonUI} from "../button/ToolbarButtonUI";

interface Props extends TimeFrameData {
    style: ViewStyle;
}

interface State {
    isExpanded: boolean;
}

export class TimeFrameItemUI extends React.PureComponent<Props, State> {
    isExpanded = () => this.props.isCurrentTimeFrame();

    state = {
        isExpanded: this.isExpanded(),
    };

    height = 0;

    getTags = () => this.props.tags.join(", ");
    getTodos = () => this.props.todos;
    getTimeRange = () => this.props.getStartTime() + " - " + this.props.getEndTime();

    doNothing = () => {
        console.log("Toggle nothing!");
    };

    toggleExpandState = () => {
        this.setState((prevState) => {
            return {isExpanded: !prevState.isExpanded};
        });
    };

    render = () => (
        <View
            style={[this.props.style]}
            onLayout={(event) => {
                this.height = event.nativeEvent.layout.height;
            }}>
            <View style={styles.header}>
                <View style={styles.headerLeft}>
                    <Text style={styles.title}>{this.getTags()}</Text>
                    <Text style={styles.timeRange}>{this.getTimeRange()}</Text>
                </View>
                <ToolbarButtonUI
                    style={{}}
                    icon={this.state.isExpanded ? "chevron-up" : "chevron-down"}
                    onPress={this.toggleExpandState}/>
            </View>

            {this.renderTaskDetails()}

            <View style={styles.buttonsContainer}>
                <ToggleButtonUI style={styles.button} icon={"alarm"} onToggle={this.doNothing}/>
                <ToggleButtonUI style={styles.button} icon={"bell-outline"} onToggle={this.doNothing}/>
                <ToggleButtonUI style={styles.button} icon={"tag-multiple-outline"} onToggle={this.doNothing}/>
                <ToggleButtonUI style={styles.button} icon={"pencil-outline"} onToggle={this.doNothing}/>
                <ToggleButtonUI style={styles.button} icon={"alert-octagon-outline"} onToggle={this.doNothing}/>
                <ToggleButtonUI style={styles.button} icon={"arrow-collapse-vertical"} onToggle={this.doNothing}/>
                <ToggleButtonUI style={styles.button} icon={"arrow-expand-vertical"} onToggle={this.doNothing}/>
            </View>
        </View>
    );

    renderTaskDetails = () => (
        <View style={[styles.fill, {display: this.state.isExpanded ? "flex" : "none"}]}>
            {this.getTodos().map((todo) => (
                <TodoUI key={todo.key} style={styles.todo} todo={todo}/>
            ))}
        </View>
    );
}

const styles = StyleSheet.create({
    fill: {flex: 1},
    header: {flex: 1, flexDirection: "row"},
    headerLeft: {flex: 1, alignSelf: "stretch"},
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
        marginHorizontal: 12,
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
        alignSelf: "stretch",
        marginTop: 16,
        flexDirection: "row",
    },
    button: {
        zIndex: 10,
        alignSelf: "center",
    },
});
