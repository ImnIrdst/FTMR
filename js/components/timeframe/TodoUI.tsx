import React from "react";
import {Pressable, StyleSheet, Text, View, ViewStyle} from "react-native";
import {Todo} from "./TimeFrameData";
import CheckBox from "@react-native-community/checkbox";
import {AppColors} from "../../resources/Colors";

interface Props {
    style: ViewStyle;
    todo: Todo;
    onTodoStateChanged: () => void;
}

interface State {
    isChecked: boolean;
}

export class TodoUI extends React.Component<Props, State> {
    getText = () => this.props.todo.text;

    state = {
        isChecked: this.props.todo.isChecked
    }

    getTodoStateStyle = () => (this.state.isChecked ? styles.isDone : styles.isUnDone);

    setCheckboxState = (value: boolean) => {
        this.updateTimeFrame(value)
        this.setState({isChecked: value})
    }

    toggleCheckbox = () => this.setState(prevState => {
        this.updateTimeFrame(!prevState.isChecked)
        return {isChecked: !prevState.isChecked}
    })

    updateTimeFrame = (value: boolean) => {
        this.props.todo.isChecked = value
        this.props.onTodoStateChanged()
    }

    render = () => (
        <View style={[this.props.style, styles.container]}>
            <CheckBox
                tintColors={{"true": AppColors.textColorDarker, "false": AppColors.textColor}}
                value={this.state.isChecked}
                onValueChange={this.setCheckboxState}/>
            <Pressable onPress={this.toggleCheckbox}>
                <Text style={[styles.text, this.getTodoStateStyle()]}>
                    {this.getText()}
                </Text>
            </Pressable>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        flex: 1,
    },
    text: {
        flex: 1,
        textAlignVertical: "center",
        marginHorizontal: 8,
        fontSize: 16,
    },
    isDone: {
        textDecorationLine: "line-through",
        color: AppColors.textColorDarker,
    },
    isUnDone: {
        textDecorationLine: "none",
        color: AppColors.textColor,
    },
});
