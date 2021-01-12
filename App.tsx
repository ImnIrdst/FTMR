import React, { useRef } from "react";
import Constants from "expo-constants";
import moment from "moment-jalaali";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView, StyleSheet, View, Text, NativeSyntheticEvent, NativeScrollEvent, Animated } from "react-native";
import { sendNotification } from "./js/utils/NotificationUtils";
import { bottomBarHeight, CountDownTimer } from "./js/components/timer/CountDownTimer";
import { TimeFrameListUI } from "./js/components/timeframe/TimeFrameListUI";
import { mockTimeFrames } from "./js/mock/MockTimeFrames";
import { AppColors } from "./js/resources/Colors";
import { DayUI } from "./js/components/day/DayUI";

const headerHeight = 92;

export default class App extends React.Component {
    scrollY = new Animated.Value(0);

    getHeaderTranslation = () => {
        const diffClamp = Animated.diffClamp(this.scrollY, 0, headerHeight);
        return Animated.multiply(-1, diffClamp);
    };

    onTimerFinished = () => sendNotification();

    getGregorianDate = () => moment().format("Do MMMM YYYY");
    getJalaaliDate = () => moment().format("jDo jMMMM  jYYYY"); // TODO extract this to day component

    render = () => (
        <SafeAreaView style={styles.container}>
            <StatusBar style="light" backgroundColor="black" />

            <DayUI style={styles.dayContainer} scrollY={this.scrollY}>

            </DayUI>

            <CountDownTimer
                style={styles.timerContainer}
                onTimerFinished={this.onTimerFinished}
                scrollY={this.scrollY}
            />
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
    dayContainer: {
        flex: 1,
        alignSelf: "stretch"
    },
    timerContainer: {
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 10,
    },
    hide: {
        display: "none",
    },
});
