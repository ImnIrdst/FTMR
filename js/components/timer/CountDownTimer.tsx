import { transform } from "@babel/core";
import React from "react";
import { StyleSheet, Text, View, Button, ViewStyle, Animated } from "react-native";
import { IconButton } from "react-native-paper";
import { Colors } from "../../resources/Colors";
import { formatEpoch, currentTimeMilies } from "../../utils/TimeUtils";

interface Props {
    style: ViewStyle;
    scrollY: Animated.Value;
    onTimerFinished: () => void;
}

export const bottomBarHeight = 82;

export class CountDownTimer extends React.Component<Props> {
    interval: any;
    startTime = -1;
    duration = 5000;

    state = {
        currentTime: this.duration,
    };

    getScrollTranslation = () => Animated.diffClamp(this.props.scrollY, 0, bottomBarHeight + bottomBarHeight / 2);

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
        <Animated.View
            style={[this.props.style, styles.container, { transform: [{ translateY: this.getScrollTranslation() }] }]}
        >
            <Text style={styles.body}>{formatEpoch(this.state.currentTime)}</Text>
            <IconButton
                icon={"play"}
                onPress={this.startTimer}
                size={42}
                color={Colors.backgroundLight}
                style={styles.button}
                accessibilityTraits={"TODO"}
                accessibilityComponentType={"TODO"}
            />
        </Animated.View>
    );
}

const styles = StyleSheet.create({
    container: {
        height: bottomBarHeight,
        flexDirection: "row",
        borderTopColor: Colors.backgroundLighter,
        borderTopWidth: 2,
        backgroundColor: Colors.backgroundLight,
    },
    body: {
        textAlignVertical: "center",
        textAlign: "center",
        flex: 1,
        padding: 16,
        fontSize: 32,
        fontWeight: "normal",
        color: "#eee",
    },
    button: {
        position: "absolute",
        alignSelf: "center",
        backgroundColor: "orange",
        top: -bottomBarHeight / 2,
        right: 0,
        marginHorizontal: 16,
    },
});
