import React, { useRef } from "react";
import Constants from "expo-constants";
import moment from "moment-jalaali";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView, StyleSheet, View, Text, NativeSyntheticEvent, NativeScrollEvent, Animated } from "react-native";
import { sendNotification } from "./js/utils/NotificationUtils";
import { bottomBarHeight, CountDownTimer } from "./js/components/timer/CountDownTimer";
import { TimeFrameListUI } from "./js/components/timeframe/TimeFrameListUI";
import { mockTimeFrames } from "./js/mock/MockTimeFrames";
import { Colors } from "./js/resources/Colors";

const AnimatedHeader = Animated.createAnimatedComponent(View);
const headerHeight = 92;

export default class App extends React.Component {
    state = {
        headerHeightAnimated: 0,
    };

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

            {
                <AnimatedHeader
                    style={[styles.headerContainer, { transform: [{ translateY: this.getHeaderTranslation() }] }]}
                >
                    <Text style={styles.gregorianDate}>{this.getGregorianDate()}</Text>
                    <Text style={styles.jalayDate}>{this.getJalaaliDate()}</Text>
                </AnimatedHeader>
            }

            <TimeFrameListUI
                style={styles.todosContainer}
                timeFrames={mockTimeFrames}
                scrollX={this.scrollY}
                topPadding={headerHeight}
                bottomPadding={bottomBarHeight}
            />

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
    headerContainer: {
        position: "absolute",
        backgroundColor: Colors.background,
        top: 0,
        left: 0,
        right: 0,
        zIndex: 10,
        height: headerHeight,
        paddingVertical: 16,
    },
    gregorianDate: {
        fontSize: 32,
        color: Colors.textColor,
        textAlign: "center",
    },
    jalayDate: {
        fontSize: 16,
        color: Colors.textColor,
        textAlign: "center",
    },
    todosContainer: {
        flex: 1,
        alignSelf: "stretch",
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
