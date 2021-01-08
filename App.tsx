import React from "react";
import Constants from "expo-constants";
import { StatusBar } from "expo-status-bar";
import { Button, SafeAreaView, StyleSheet, Text } from "react-native";
import { sendNotification } from "./js/utils/NotificationUtils";
import { CountDownTimer } from "./js/components/CountDownTimer";
import { TimeFrameExpanded } from "./js/components/TimeFrameExpanded";

interface Props {}

export default class App extends React.Component<Props> {
    constructor(props: Props) {
        super(props);
    }

    onTimerFinished = () => {
        sendNotification();
    };

    render = () => (
        <SafeAreaView style={styles.container}>
            <StatusBar style="light" backgroundColor="black" />

            <TimeFrameExpanded />

            <CountDownTimer onTimerFinished={this.onTimerFinished} />
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
});
