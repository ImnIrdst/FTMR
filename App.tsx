import React from "react";
import { StatusBar } from "expo-status-bar";
import { Button, SafeAreaView, StyleSheet, Text } from "react-native";
import { sendNotification } from "./js/utils/NotificationUtils";
import { CountDownTimer, TimerAction } from "./js/components/CountDownTimer";

interface State {
    timerAction: TimerAction
}

interface Props {}

export default class App extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props)
        this.state = {
            timerAction: TimerAction.Free,
        }
    }

    onTimerFinished = () => {
        sendNotification()  
    };

    startTimer = () => {
        this.setState({timerAction: TimerAction.Start})
    }

    render = () => (
        <SafeAreaView style={styles.container}>
            <StatusBar style="light" backgroundColor="black" />

            <CountDownTimer action={this.state.timerAction} onTimerFinished={this.onTimerFinished} />

            <Button
                title="Send Notification"
                onPress={this.startTimer}
                color="darkorange"
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "black",
        alignItems: "center",
        justifyContent: "flex-end",
        paddingBottom: 64,
    },
});
