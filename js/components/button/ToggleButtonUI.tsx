import React from "react";
import { StyleSheet, View, ViewStyle } from "react-native";
import { Colors, IconButton } from "react-native-paper";

interface Props {
    style: ViewStyle;
    icon: string;
    onToggle: (isActive: boolean) => void;
}

interface State {
    isActive: boolean;
}

export class ToggleButtonUI extends React.Component<Props, State> {
    state = {
        isActive: false,
    };

    toggle = () => {
        this.setState((prevState) => {
            return { isActive: !prevState.isActive };
        });
    };

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