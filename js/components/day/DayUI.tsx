import React, {createRef} from "react";
import moment from "moment-jalaali";
import {StyleSheet, View, Text, Animated, ViewStyle} from "react-native";
import {mockTimeFrames} from "../../mock/MockTimeFrames";
import {bottomBarHeight} from "../timer/CountDownTimer";
import {TimeFrameListUI} from "../timeframe/TimeFrameListUI";
import {AppColors} from "../../resources/Colors";
import {ToolbarButtonUI} from "../button/ToolbarButtonUI";
// @ts-ignore
import Notification from  'ii-react-native-android-local-notification'

export const headerHeight = 128;

interface Props {
    style: ViewStyle;
    scrollY: Animated.Value;
}

interface State {
    currentTime: moment.Moment
}

export class DayUI extends React.Component<Props, State> {

    listRef = createRef<TimeFrameListUI>()

    state = {
        currentTime: moment()
    }

    componentDidMount() {
        this.setAlarms()
    }

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

    goToCurrent = () => {
        this.listRef.current?.forceScrollToToday()
    }

    render = () => (
        <View style={[this.props.style, styles.container]}>
            <Animated.View style={[styles.headerContainer, this.getHeaderTranslationStyle()]}>
                <ToolbarButtonUI style={styles.headerIcons} icon={"chevron-left"} onPress={this.onPrevDayPress}/>
                <View style={styles.dateContainer}>
                    <Text style={styles.gregorianDate}>{this.getGregorianDate()}</Text>
                    <Text style={styles.jalaaliDate}>{this.getJalaaliDate()}</Text>
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

    setAlarms = () => {
        mockTimeFrames.forEach((it) => {
            if (it.hasAlarm) {
                Notification.create({
                    id: 1337,
                    subject: `Focus Session Started`,
                    message: `${it.getTitle()} ${it.getTimeRange()}`,
                    bigText: `${it.getTitle()} ${it.getTimeRange()}\n${it.getTodos()}`,
                    smallIcon: 'notification_icon',
                    autoClear: true,
                    sendAt: moment().add(5, "seconds").toDate(),
                    channelId: "timer-end",
                    channelName: "Timer alert",
                    channelDescription: "An alert thrown when timer finishes",
                    payload: { number: 1, what: true, someAnswer: '42' }
                });
                return
            }
        })
    }
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
    headerIcons: {},
    todosContainer: {
        flex: 1,
        alignSelf: "stretch",
    },
});
