import { transform } from "@babel/core";
import React from "react";
import { StyleSheet, Text, View, Button, ViewStyle } from "react-native";
import { Colors, IconButton } from "react-native-paper";
import { formatEpoch, currentTimeMilies } from "../../utils/TimeUtils";

interface Props {
    style: ViewStyle;
    onTimerFinished: () => void;
}

export class CountDownTimer extends React.Component<Props> {
    interval: any;
    startTime = -1;
    duration = 5000;

    state = {
        currentTime: this.duration,
    };

    startTimer = () => {
        this.startTime = currentTimeMilies();
        this.setState({ currentTime: this.duration });

        clearInterval(this.interval);

        this.interval = setInterval(() => {
            this.setState({ currentTime: this.state.currentTime - 1000 });
            if (currentTimeMilies() > this.startTime + this.duration) {
                this.clearTimer();
                this.props.onTimerFinished();
            }
        }, 1000);
    };

    componentWillUnmount = () => {
        this.clearTimer();
    };

    clearTimer = () => {
        this.setState({ currentTime: this.duration });
        clearInterval(this.interval);
    };

    render = () => (
        <View style={this.props.style}>
            <Text style={styles.body}>
                {formatEpoch(this.state.currentTime)}
            </Text>
            <IconButton
                icon={"play"}
                onPress={this.startTimer}
                size={42}
                color={Colors.grey900}
                style={styles.button}
                accessibilityTraits={"TODO"}
                accessibilityComponentType={"TODO"}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    body: {
        textAlignVertical: "center",
        textAlign: "center",
        flex: 1,
        padding: 16,
        transform: [{   scaleY: 1.2   }],
        fontSize: 64,
        fontWeight: "normal",
        color: "#eee",
    },
    button: {
        alignSelf: "center",
        backgroundColor: "orange",
        marginTop: 0,
        marginHorizontal: 16,
        marginBottom: 32,
    },
});
