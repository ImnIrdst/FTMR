import React from "react";
import {StyleSheet, Text, ViewStyle, Animated} from "react-native";
import {IconButton} from "react-native-paper";
import {AppColors} from "../../resources/Colors";
import {formatEpoch} from "../../utils/TimeUtils";
import moment from "moment-jalaali";
// @ts-ignore
import Notification from  'ii-react-native-android-local-notification'


interface Props {
    style: ViewStyle;
    scrollY: Animated.Value;
}

interface State {
    startTime: moment.Moment;
    currentTime: moment.Moment;
    endTime: moment.Moment;
}

export const bottomBarHeight = 82;

export class CountDownTimer extends React.Component<Props, State> {
    interval: any;
    duration = 5;

    constructor(props: Props) {
        super(props);

        this.state = this.initState()
    }

    initState = () => {
        return {
            startTime: moment().milliseconds(0), // TODO: read this from storage
            currentTime: moment().milliseconds(0),
            endTime: moment().add(this.duration, "seconds").milliseconds(0), // TODO: read this from storage
        };
    }

    resetState = () => {
        this.setState(this.initState())
    }

    getScrollTranslation = () => Animated.diffClamp(this.props.scrollY, 0, bottomBarHeight + bottomBarHeight / 2);

    startTimer = () => {
        this.resetState()
        clearInterval(this.interval);

        Notification.create({
            id: 1337,
            subject: 'Ftmr',
            message: `Timer finished.`,
            smallIcon: 'notification_icon',
            autoClear: true,
            delay: this.duration * 1000,
            channelId: "timer-end",
            channelName: "Timer alert",
            channelDescription: "An alert thrown when timer finishes",
            payload: { number: 1, what: true, someAnswer: '42' }
        });

        this.interval = setInterval(() => {
            const currentTime = moment().milliseconds(0)

            if (moment(this.state.endTime).diff(currentTime, "seconds") < 0) {
                this.clearTimer();
            } else {
                this.setState({currentTime});
            }
        }, 1000);
    };

    componentWillUnmount = () => {
        this.clearTimer();
    };

    clearTimer = () => {
        this.resetState()
        clearInterval(this.interval);
    };

    render = () => (
        <Animated.View
            style={[
                this.props.style,
                styles.container,
                {transform: [{translateY: this.getScrollTranslation()}]}
            ]}>

            <Text style={styles.body}>{formatEpoch(this.state.currentTime, this.state.endTime)}</Text>
            <IconButton
                icon={"play"}
                onPress={this.startTimer}
                size={42}
                color={AppColors.backgroundLight}
                style={styles.button}
                accessibilityTraits={"TODO"}
                accessibilityComponentType={"TODO"}
            />
        </Animated.View>
    );
}

const styles = StyleSheet.create({
    container: {
        height: bottomBarHeight,
        flexDirection: "row",
        borderTopColor: AppColors.backgroundLighter,
        borderTopWidth: 2,
        backgroundColor: AppColors.backgroundLight,
    },
    body: {
        textAlignVertical: "center",
        textAlign: "center",
        flex: 1,
        padding: 16,
        fontSize: 32,
        fontWeight: "normal",
        color: "#eee",
    },
    button: {
        position: "absolute",
        alignSelf: "center",
        backgroundColor: "orange",
        top: -bottomBarHeight / 2,
        right: 0,
        marginHorizontal: 16,
    },
});
