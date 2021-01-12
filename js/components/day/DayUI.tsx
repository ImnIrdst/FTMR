import React from "react";
import moment from "moment-jalaali";
import { StyleSheet, View, Text, Animated, ViewStyle } from "react-native";
import { mockTimeFrames } from "../../mock/MockTimeFrames";
import { bottomBarHeight } from "../timer/CountDownTimer";
import { TimeFrameListUI } from "../timeframe/TimeFrameListUI";
import { AppColors } from "../../resources/Colors";
import { ToolbarButtonUI } from "../button/ToolbarButtonUI";

export const headerHeight = 128;

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

    onPrevDayPress = () => {};

    onNextDayPress = () => {};

    render = () => (
        <View style={[this.props.style, styles.container]}>
            <Animated.View style={[styles.headerContainer, this.getTranslatioStyle()]}>
                <ToolbarButtonUI style={styles.headerIcons} icon={"chevron-left"} onPress={this.onPrevDayPress} />
                <View style={styles.dateContainer}>
                    <Text style={styles.gregorianDate}>{this.getGregorianDate()}</Text>
                    <Text style={styles.jalayDate}>{this.getJalaaliDate()}</Text>
                </View>
                <ToolbarButtonUI style={styles.headerIcons} icon={"chevron-right"} onPress={this.onNextDayPress} />
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
        flex: 1,
        backgroundColor: "black",
    },
    headerContainer: {
        flexDirection: "row",
        position: "absolute",
        backgroundColor: AppColors.background,
        top: 0,
        left: 0,
        right: 0,
        zIndex: 10,
        height: headerHeight,
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 16,
    },
    dateContainer: { 
        marginHorizontal: 8 
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
    headerIcons: {},
    todosContainer: {
        flex: 1,
        alignSelf: "stretch",
    },
});
