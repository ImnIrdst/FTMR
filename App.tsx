import React from "react";
import Constants from "expo-constants";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView, StyleSheet } from "react-native";
import { sendNotification } from "./js/utils/NotificationUtils";
import { CountDownTimer } from "./js/components/timer/CountDownTimer";
import { TimeFrameListUI } from "./js/components/timeframe/TimeFrameListUI";
import { mockTimeFrames } from "./js/mock/MockTimeFrames";

export default class App extends React.Component  {
    onTimerFinished = () => {
        sendNotification();
    };

    render = () => (
        <SafeAreaView style={styles.container}>
            <StatusBar style="light" backgroundColor="black" />
            
            <TimeFrameListUI timeFrames={mockTimeFrames}/>

            <CountDownTimer onTimerFinished={this.onTimerFinished} />
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
});
