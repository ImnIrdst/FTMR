import React, {createRef} from "react";
import moment from "moment-jalaali";
import {StyleSheet, View, Text, Animated, ViewStyle, TouchableHighlight} from "react-native";
import {mockTimeFrames} from "../../mock/MockTimeFrames";
import {bottomBarHeight} from "../timer/CountDownTimer";
import {TimeFrameListUI} from "../timeframe/TimeFrameListUI";
import {AppColors} from "../../resources/Colors";
import {ToolbarButtonUI} from "../button/ToolbarButtonUI";

export const headerHeight = 156;

interface Props {
    style: ViewStyle;
    scrollY: Animated.Value;
}

export class DayUI extends React.Component<Props> {

    listRef = createRef<TimeFrameListUI>()
    getHeaderTranslation = () => {
        const diffClamp = Animated.diffClamp(this.props.scrollY, 0, headerHeight);
        return Animated.multiply(-1, diffClamp);
    };

    getHeaderTranslationStyle = () => {
        return {transform: [{translateY: this.getHeaderTranslation()}]};
    };

    getGregorianDate = () => moment().format("Do MMMM YYYY");

    getJalaaliDate = () => moment().format("jDo jMMMM  jYYYY");

    onPrevDayPress = () => {
    };

    onNextDayPress = () => {
    };

    onGoToTodayClicked = () => {
        this.listRef.current?.forceScrollToToday()
    }

    render = () => (
        <View style={[this.props.style, styles.container]}>
            <Animated.View style={[styles.headerContainer, this.getHeaderTranslationStyle()]}>
                <ToolbarButtonUI style={styles.headerIcons} icon={"chevron-left"} onPress={this.onPrevDayPress}/>
                <View style={styles.dateContainer}>
                    <Text style={styles.gregorianDate}>{this.getGregorianDate()}</Text>
                    <Text style={styles.jalaaliDate}>{this.getJalaaliDate()}</Text>
                    <TouchableHighlight onPress={this.onGoToTodayClicked}>
                        <Text style={styles.todayButton}>Go to current time</Text>
                    </TouchableHighlight>
                </View>
                <ToolbarButtonUI style={styles.headerIcons} icon={"chevron-right"} onPress={this.onNextDayPress}/>
            </Animated.View>

            <TimeFrameListUI
                ref={this.listRef}
                style={styles.todosContainer}
                timeFrames={mockTimeFrames}
                scrollX={this.props.scrollY}
                topPadding={headerHeight}
                bottomPadding={bottomBarHeight}/>
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
        marginHorizontal: 8,
    },
    gregorianDate: {
        fontSize: 32,
        color: AppColors.textColor,
        textAlign: "center",
    },
    jalaaliDate: {
        fontSize: 16,
        color: AppColors.textColor,
        textAlign: "center",
    },
    todayButton: {
        fontSize: 16,
        color: AppColors.textColor,
        textAlign: "center",
        borderWidth: 1,
        margin: 16,
        padding: 8,
        borderRadius: 16,
        borderColor: AppColors.textColor
    },
    headerIcons: {},
    todosContainer: {
        flex: 1,
        alignSelf: "stretch",
    },
});
