import { StatusBar } from "expo-status-bar";
import React from "react";
import {
    Button,
    SafeAreaView,
    StyleSheet,
    Text,
    NativeModules,
} from "react-native";

const { FtmrNotificationModule } = NativeModules;

interface MainScreenState {
    currentTime: number;
}

interface MainScreenProps {}

const currentTimeMilies = () => {
    return new Date().getTime();
};

const addLeadingZeros = (num: number) => {
    let str = num.toString();
    if (str.length == 1) return "0" + str;
    else return str;
};

const formatEpoch = (epoch: number) => {
    let seconds = Math.round(epoch / 1000);
    let minutes = Math.round(seconds / 60);
    return `${addLeadingZeros(minutes)}:${addLeadingZeros(seconds % 60)}`;
};

export default class App extends React.Component {
    intervalId: any;
    startTime = -1;
    duration = 5000;

    state = {
        currentTime: this.duration,
    };

    sendNotification = () => {
        FtmrNotificationModule.showNotification("Ftmr", "Times up!");
    };

    startTimer = () => {
        this.startTime = currentTimeMilies();
        this.setState({ currentTime: this.duration });

        clearInterval(this.intervalId);

        this.intervalId = setInterval(() => {
            this.setState({ currentTime: this.state.currentTime - 1000 });
            if (currentTimeMilies() > this.startTime + this.duration) {
                this.sendNotification();
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
