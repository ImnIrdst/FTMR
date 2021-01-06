import React from "react";
import { StatusBar } from "expo-status-bar";
import { Button, SafeAreaView, StyleSheet, Text } from "react-native";
import { formatEpoch, currentTimeMilies } from "./js/utils/TimeUtils";
import { sendNotification } from "./js/utils/NotificationUtils";

interface MainScreenState {
    currentTime: number;
}

interface MainScreenProps {}

export default class App extends React.Component {
    intervalId: any;
    startTime = -1;
    duration = 5000;

    state = {
        currentTime: this.duration,
    };

    startTimer = () => {
        this.startTime = currentTimeMilies();
        this.setState({ currentTime: this.duration });

        clearInterval(this.intervalId);

        this.intervalId = setInterval(() => {
            this.setState({ currentTime: this.state.currentTime - 1000 });
            if (currentTimeMilies() > this.startTime + this.duration) {
                sendNotification();
                clearInterval(this.intervalId);
            }
        }, 1000);
    };

    render = () => (
        <SafeAreaView style={styles.container}>
            <StatusBar style="light" backgroundColor="black" />

            <Text style={styles.body}>
                {formatEpoch(this.state.currentTime)}
            </Text>

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
    body: {
        textAlignVertical: "center",
        flex: 1,
        padding: 32,
        fontSize: 64,
        color: "#eee",
    },
});
