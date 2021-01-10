import React from "react";
import Constants from "expo-constants";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView, StyleSheet, StyleProp } from "react-native";
import { sendNotification } from "./js/utils/NotificationUtils";
import { CountDownTimer } from "./js/components/timer/CountDownTimer";
import { TimeFrameListUI } from "./js/components/timeframe/TimeFrameListUI";
import { mockTimeFrames } from "./js/mock/MockTimeFrames";

export default class App extends React.Component {
    componentDidMount = () => {
        console.log(styles.container);
    };

    onTimerFinished = () => {
        sendNotification();
    };

    render = () => (
        <SafeAreaView style={styles.container}>
            <StatusBar style="light" backgroundColor="black" />

            <TimeFrameListUI
                style={styles.fillWidth}
                timeFrames={mockTimeFrames}
            />

            <CountDownTimer
                style={styles.timerContainer}
                onTimerFinished={this.onTimerFinished}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    fillWidth: {
        flex: 1,
        alignSelf: "stretch",
    },
    container: {
        flex: 1,
        backgroundColor: "black",
        alignItems: "center",
        justifyContent: "flex-start",
        marginTop: Constants.statusBarHeight,
    },
    timerContainer: {
        flex: 1,
        alignSelf: "stretch",
        backgroundColor: "blue",
        alignContent: "center",
        paddingBottom: 64,
    },
});
