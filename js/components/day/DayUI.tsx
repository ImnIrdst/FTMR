import React, { useRef } from "react";
import Constants from "expo-constants";
import moment from "moment-jalaali";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, Text, Animated, ViewStyle } from "react-native";
import { mockTimeFrames } from "../../mock/MockTimeFrames";
import { bottomBarHeight } from "../timer/CountDownTimer";
import { TimeFrameListUI } from "../timeframe/TimeFrameListUI";
import { AppColors } from "../../resources/Colors";

export const headerHeight = 92;

interface Props {
    style: ViewStyle;
    scrollY: Animated.Value;
}

export class DayUI extends React.Component<Props> {
    getHeaderTranslation = () => {
        const diffClamp = Animated.diffClamp(this.props.scrollY, 0, headerHeight);
        return Animated.multiply(-1, diffClamp);
    };

    getTranslatioStyle = () => {
        return { transform: [{ translateY: this.getHeaderTranslation() }] };
    };

    getGregorianDate = () => moment().format("Do MMMM YYYY");
    getJalaaliDate = () => moment().format("jDo jMMMM  jYYYY");

    render = () => (
        <View style={[this.props.style, styles.container]}>
            <StatusBar style="light" backgroundColor="black" />

            <Animated.View style={[styles.headerContainer, this.getTranslatioStyle()]}>
                <Text style={styles.gregorianDate}>{this.getGregorianDate()}</Text>
                <Text style={styles.jalayDate}>{this.getJalaaliDate()}</Text>
            </Animated.View>

            <TimeFrameListUI
                style={styles.todosContainer}
                timeFrames={mockTimeFrames}
                scrollX={this.props.scrollY}
                topPadding={headerHeight}
                bottomPadding={bottomBarHeight}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "black",
    },
    headerContainer: {
        position: "absolute",
        backgroundColor: AppColors.background,
        top: 0,
        left: 0,
        right: 0,
        zIndex: 10,
        height: headerHeight,
        paddingVertical: 16,
    },
    gregorianDate: {
        fontSize: 32,
        color: AppColors.textColor,
        textAlign: "center",
    },
    jalayDate: {
        fontSize: 16,
        color: AppColors.textColor,
        textAlign: "center",
    },
    todosContainer: {
        flex: 1,
        alignSelf: "stretch",
    },
});
