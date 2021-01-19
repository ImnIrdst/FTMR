import React from "react";
import Constants from "expo-constants";
import {StatusBar} from "expo-status-bar";
import {SafeAreaView, StyleSheet, Animated} from "react-native";
import {CountDownTimer} from "./js/components/timer/CountDownTimer";
import {DayUI} from "./js/components/day/DayUI";

export default class App extends React.Component {
    scrollY = new Animated.Value(0);

    componentDidMount() {
        this.scrollY = new Animated.Value(0);
    }

    render = () => (
        <SafeAreaView style={styles.container}>
            <StatusBar style="light" backgroundColor="black"/>

            <DayUI style={styles.dayContainer} scrollY={this.scrollY}/>

            <CountDownTimer
                style={styles.timerContainer}
                scrollY={this.scrollY}/>
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
