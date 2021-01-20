import React from "react";
import { StyleSheet, View, ViewStyle } from "react-native";
import { Colors, IconButton } from "react-native-paper";

interface Props {
    style: ViewStyle;
    icon: string;
    initActiveState: boolean;
    onToggle: (isActive: boolean) => void;
}

interface State {
    isActive: boolean;
}

export class ToggleButtonUI extends React.Component<Props, State> {
    state = {
        isActive: this.props.initActiveState,
    };

    toggle = () => {
        this.setState((prevState) => {
            this.props.onToggle(!prevState.isActive);
            return { isActive: !prevState.isActive };
        });
    };

    setActiveState = (isActive: boolean) => {
        this.setState({isActive})
    }

    getStateStyle = () => (this.state.isActive ? styles.activeState : styles.deActiveState);

    render = () => (
        <View style={this.props.style}>
            <IconButton
                icon={this.props.icon}
                onPress={this.toggle}
                size={24}
                color={Colors.grey900}
                style={[styles.button, this.getStateStyle()]}
                accessibilityTraits={"TODO"}
                accessibilityComponentType={"TODO"}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    button: {
        color: "red",
        alignSelf: "center",
        margin: 8,
    },
    activeState: {
        backgroundColor: Colors.orange400,
    },
    deActiveState: {
        backgroundColor: Colors.grey200,
    },
});
