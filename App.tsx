import React from "react";
import Constants from "expo-constants";
import { Text } from "react-native";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView, StyleSheet } from "react-native";
import { sendNotification } from "./js/utils/NotificationUtils";
import { CountDownTimer } from "./js/components/timer/CountDownTimer";
import { TimeFrameUI } from "./js/components/timeframe/TimeFrameItemUI";
import { mockTimeFrames } from "./js/mock/MockTimeFrames";
import { ScrollView } from "react-native-gesture-handler";

interface Props {}

export default class App extends React.Component<Props> {
    onTimerFinished = () => {
        sendNotification();
    };

    render = () => (
        <SafeAreaView style={styles.container}>
            <StatusBar style="light" backgroundColor="black" />

            <ScrollView style={styles.fillWidth}>
                {mockTimeFrames.map((timeFrame) => (
                    <TimeFrameUI data={timeFrame} />
                ))}
                {/* <Text style={{ color: "white", fontSize: 64 }}>asdasd</Text>
                <Text style={{ color: "white", fontSize: 64 }}>asdasd</Text>
                <Text style={{ color: "white", fontSize: 64 }}>asdasd</Text>
                <Text style={{ color: "white", fontSize: 64 }}>asdasd</Text>
                <Text style={{ color: "white", fontSize: 64 }}>asdasd</Text>
                <Text style={{ color: "white", fontSize: 64 }}>asdasd</Text>
                <Text style={{ color: "white", fontSize: 64 }}>asdasd</Text> */}
            </ScrollView>

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
