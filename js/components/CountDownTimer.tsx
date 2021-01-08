import React from "react";
import { StyleSheet, Text } from "react-native";
import { formatEpoch, currentTimeMilies } from "../utils/TimeUtils";

interface Props {
    onTimerFinished: () => void;
    action: TimerAction;
}

export enum TimerAction {
    Free,
    Start,
}

export class CountDownTimer extends React.Component<Props> {
    interval: any;
    startTime = -1;
    duration = 5000;

    state = {
        currentTime: this.duration,
    };

    componentDidUpdate(prevProps: Props) {
        if (this.props !== prevProps) {
            if (this.props.action === TimerAction.Start) {
                this.startTimer();
            }
        }
    }

    startTimer = () => {
        this.startTime = currentTimeMilies();
        this.setState({ currentTime: this.duration });

        clearInterval(this.interval);

        this.interval = setInterval(() => {
            this.setState({ currentTime: this.state.currentTime - 1000 });
            if (currentTimeMilies() > this.startTime + this.duration) {
                this.clearTimer();
            }
        }, 1000);
    };

    componentWillUnmount = () => {
        this.clearTimer();
    };

    clearTimer = () => {
        this.setState({ currentTime: this.duration });
        this.props.onTimerFinished();
        clearInterval(this.interval);
    };

    render = () => (
        <Text style={styles.body}>{formatEpoch(this.state.currentTime)}</Text>
    );
}

const styles = StyleSheet.create({
    body: {
        textAlignVertical: "center",
        flex: 1,
        padding: 32,
        fontSize: 64,
        color: "#eee",
    },
});