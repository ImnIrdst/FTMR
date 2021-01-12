import React from "react";
import { StyleSheet, View, ViewStyle } from "react-native";
import { IconButton } from "react-native-paper";
import { AppColors } from "../../resources/Colors";

interface Props {
    style: ViewStyle;
    icon: string;
    onPress: () => void;
}

interface State {
    isActive: boolean;
}

export class ToolbarButtonUI extends React.Component<Props, State> {
    onPress = () => {
        this.props.onPress();
    };

    render = () => (
        <View style={this.props.style}>
            <IconButton
                icon={this.props.icon}
                onPress={this.onPress}
                size={32}
                color={AppColors.textColor}
                style={[styles.button]}
                accessibilityTraits={"TODO"}
                accessibilityComponentType={"TODO"}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    button: {
        alignSelf: "center",
        margin: 8,
    },
});
