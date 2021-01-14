import React from "react";
import {Pressable, StyleSheet, Text, View, ViewStyle} from "react-native";
import {TimeFrameData, Todo} from "./TimeFrameData";
import {ToggleButtonUI} from "../button/ToggleButtonUI";
import {TodoUI} from "./TodoUI";
import {ToolbarButtonUI} from "../button/ToolbarButtonUI";
import {AppColors} from "../../resources/Colors";
import {Icon} from "react-native-elements";

interface Props extends TimeFrameData {
    style: ViewStyle;
}

interface State {
    isExpanded: boolean;
    isExpandedDoneTodos: boolean;
    todos: Todo[];
}

export class TimeFrameItemUI extends React.Component<Props, State> {
    isExpanded = () => this.props.isCurrentTimeFrame();

    state = {
        isExpanded: this.isExpanded(),
        isExpandedDoneTodos: false,
        todos: this.props.todos,
    };

    height = 0;

    getTags = () => this.props.tags.join(", ");
    getDoneTodos = () => this.props.todos.filter((todo) => todo.isChecked);
    getUndoneTodos = () => this.props.todos.filter((todo) => !todo.isChecked);
    getTimeRange = () => this.props.getStartTime() + " - " + this.props.getEndTime();

    toggleExpandState = () => {
        this.setState((prevState) => {
            return {isExpanded: !prevState.isExpanded};
        });
    };

    toggleDoneTodos = () => {
        this.setState((prevState) => {
            return {isExpandedDoneTodos: !prevState.isExpandedDoneTodos};
        });
    }

    doNothing = () => {
        console.log("Toggle nothing!");
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
                    icon={this.state.isExpanded ? "chevron-up" : "chevron-down"}
                    onPress={this.toggleExpandState}/>
            </View>

            {this.state.isExpanded && this.renderTaskDetails()}

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

    onTodoStateChanged = () => {
        this.setState({todos: this.props.todos})
    }

    renderTaskDetails = () => (
        <View style={[styles.fill]}>
            {this.getUndoneTodos().map((todo) => (
                <TodoUI
                    style={styles.todo}
                    key={todo.key}
                    todo={todo}
                    onTodoStateChanged={this.onTodoStateChanged}/>
            ))}

            <View style={styles.fill}>
                <Pressable style={styles.doneHeaderContainer} onPress={this.toggleDoneTodos}>
                    <Icon style={styles.doneHeaderIcon}
                          name={this.state.isExpandedDoneTodos ? "chevron-up" : "chevron-down"}
                          type={"material-community"}
                          color={AppColors.textColorDarker}/>
                    <Text style={styles.doneHeader}>{`${this.getDoneTodos().length} Completed Todos`}</Text>
                </Pressable>

                {this.state.isExpandedDoneTodos && this.getDoneTodos().map((todo) => (
                    <TodoUI
                        style={styles.todo}
                        key={todo.key}
                        todo={todo}
                        onTodoStateChanged={this.onTodoStateChanged}/>
                ))}
            </View>
        </View>

    );
}

const styles = StyleSheet.create({
    fill: {flex: 1, alignSelf: "stretch"},
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
        marginHorizontal: 8,
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
    doneHeaderContainer: {
        alignContent: "center",
        flexDirection: "row",
        marginTop: 16,
        margin: 8,
    },
    doneHeader: {
        color: AppColors.textColorDarker,
        textAlignVertical: "center",
        fontSize: 18,
    },
    doneHeaderIcon: {
        margin: 4,
    }

});
