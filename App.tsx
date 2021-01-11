import React from "react";
import Constants from "expo-constants";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView, StyleSheet } from "react-native";
import { sendNotification } from "./js/utils/NotificationUtils";
import { CountDownTimer } from "./js/components/timer/CountDownTimer";
import { TimeFrameListUI } from "./js/components/timeframe/TimeFrameListUI";
import { mockTimeFrames } from "./js/mock/MockTimeFrames";
import { Colors } from "react-native-paper";

export default class App extends React.Component {
    onTimerFinished = () => {
        sendNotification();
    };

    render = () => (
        <SafeAreaView style={styles.container}>
            <StatusBar style="light" backgroundColor="black" />

            <TimeFrameListUI style={styles.todosContainer} timeFrames={mockTimeFrames} />

            <CountDownTimer style={styles.timerContainer} onTimerFinished={this.onTimerFinished} />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "black",
        alignItems: "center",
        justifyContent: "flex-start",
        marginTop: Constants.statusBarHeight,
    },
    todosContainer: {
        flex: 5,
        alignSelf: "stretch",
    },
    timerContainer: {
        flex: 2,
        borderRadius: 32,
        alignSelf: "stretch",
        backgroundColor: Colors.grey800,
        alignContent: "center",
    },
});
