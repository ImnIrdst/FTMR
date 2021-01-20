import React, {createRef} from "react";
import moment from "moment-jalaali";
import {StyleSheet, View, Text, Animated, ViewStyle, TouchableHighlight} from "react-native";
import {mockTimeFrames} from "../../mock/MockTimeFrames";
import {bottomBarHeight} from "../timer/CountDownTimer";
import {TimeFrameListUI} from "../timeframe/TimeFrameListUI";
import {AppColors} from "../../resources/Colors";
import {ToolbarButtonUI} from "../button/ToolbarButtonUI";
// @ts-ignore
import Notification from  'ii-react-native-android-local-notification'

export const headerHeight = 156;

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

    prevScrollY = 0
    interval = setInterval(() => {
        this.setState({currentTime: moment()})
    }, 1000)

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

    onGoToTodayClicked = () => {
        this.listRef.current?.forceScrollToToday()
    }

    componentWillUnmount() {
        clearInterval(this.interval)
    }

    shouldComponentUpdate(nextProps: Readonly<Props>, nextState: Readonly<State>, nextContext: any): boolean {
        const curScrollY = Number.parseInt(JSON.stringify(nextProps.scrollY))

        let shouldUpdate = curScrollY === this.prevScrollY

        this.prevScrollY = curScrollY

        return shouldUpdate
    }

    render = () => (
        <View style={[this.props.style, styles.container]}>
            <Animated.View style={[styles.headerContainer, this.getHeaderTranslationStyle()]}>
                <ToolbarButtonUI style={styles.headerIcons} icon={"chevron-left"} onPress={this.onPrevDayPress}/>
                <View style={styles.dateContainer}>
                    <Text style={styles.gregorianDate}>{this.getGregorianDate()}</Text>
                    <Text style={styles.jalaaliDate}>{this.getJalaaliDate()}</Text>
                    <TouchableHighlight onPress={this.onGoToTodayClicked}>
                        <Text style={styles.todayButton}>{this.state.currentTime.format("HH:mm:ss")}</Text>
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

    setAlarms = () => {
        mockTimeFrames.forEach((it) => {
            if (it.hasAlarm) {
                Notification.create({
                    id: 1337,
                    subject: 'Ftmr',
                    message: `Timer finished.`,
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
    todayButton: {
        fontSize: 16,
        fontWeight: "bold",
        color: AppColors.textColor,
        textAlign: "center",
        borderWidth: 2,
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
