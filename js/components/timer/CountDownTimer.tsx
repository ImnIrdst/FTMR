import React from "react";
import {StyleSheet, Text, ViewStyle, Animated, Pressable} from "react-native";
import {AppColors} from "../../resources/Colors";
import {formatEpoch} from "../../utils/TimeUtils";
import moment from "moment-jalaali";
import {mockTimeFrames} from "../../mock/MockTimeFrames";
import {compareTimeFrames, TimeFrameData} from "../timeframe/TimeFrameData";

interface Props {
    style: ViewStyle;
    scrollY: Animated.Value;
    goToCurrent: () => void;
}

interface State {
    startTime: moment.Moment;
    currentTime: moment.Moment;
    endTime: moment.Moment;
    currentTimeFrame: TimeFrameData;
    nextTimeFrame: TimeFrameData | undefined;
}

export const bottomBarHeight = 92;

export class CountDownTimer extends React.Component<Props, State> {
    interval: any;
    duration = 5;
    prevScrollY = 0;

    constructor(props: Props) {
        super(props);

        this.state = this.initState()
    }

    initState = () => {
        const currentTimeFrame = mockTimeFrames.find((it) => it.isCurrentTimeFrame())
        if (currentTimeFrame === undefined) {
            throw Error("Can not find current time frame")
        }

        const nextTimeFrame = mockTimeFrames.find((it) => compareTimeFrames(it, currentTimeFrame) > 0)

        return {
            startTime: currentTimeFrame.startDate,
            currentTime: moment().milliseconds(0),
            endTime: currentTimeFrame.endDate,
            currentTimeFrame: currentTimeFrame,
            nextTimeFrame: nextTimeFrame
        };
    }

    componentDidMount() {
        this.resetTimer()
    }

    shouldComponentUpdate(nextProps: Readonly<Props>, nextState: Readonly<State>, nextContext: any): boolean {
        const curScrollY = Number.parseInt(JSON.stringify(nextProps.scrollY))

        let shouldUpdate = curScrollY === this.prevScrollY

        this.prevScrollY = curScrollY

        return shouldUpdate
    }


    resetTimer = () => {
        const initState = this.initState()
        this.setState(initState)

        clearInterval(this.interval);
        this.interval = setInterval(() => {
            const currentTime = moment().milliseconds(0)

            if (moment(this.state.endTime).diff(currentTime, "seconds") < 0) {
                this.resetTimer();
            } else {
                this.setState({currentTime});
            }
        }, 1000);
    }

    getScrollTranslation = () => Animated.diffClamp(this.props.scrollY, 0, bottomBarHeight + bottomBarHeight / 2);

    componentWillUnmount = () => {
        this.clearTimer();
    };

    clearTimer = () => {
        clearInterval(this.interval);
    };

    getTimeFrameInfo = () => {
        const it = this.state.currentTimeFrame
        if (it.isInFocusRange()) {
            return `Focus: Current ${this.state.currentTimeFrame.getTitle()}, ${this.state.currentTimeFrame.getFocusTimeRangeFormatted()}`
        } else {
            return `Rest: Next ${this.state.nextTimeFrame?.getTitle()}, ${this.state.currentTimeFrame.getRestTimeRangeFormatted()}`
        }
    }

    getBackgroundColor = () => {
        const it = this.state.currentTimeFrame
        if (it.isInFocusRange()) {
            return it.getActiveColor()
        } else {
            return AppColors.primaryColor
        }
    }

    render = () => (
        <Animated.View
            style={[
                this.props.style,
                styles.container,
                {transform: [{translateY: this.getScrollTranslation()}]},
                {backgroundColor: this.getBackgroundColor()},
            ]}>

            <Pressable style={styles.darkShade} onPress={this.props.goToCurrent}>
                <Text style={styles.body}>{formatEpoch(this.state.currentTime, this.state.endTime)}</Text>
                <Text style={styles.timeFrameInfo}>{`${this.getTimeFrameInfo()}, ${moment().format("HH:mm:ss")}`}</Text>
            </Pressable>
        </Animated.View>
    );
}

const styles = StyleSheet.create({
    container: {
        height: bottomBarHeight,
        flexDirection: "row",
        borderTopLeftRadius: 64,
        borderTopRightRadius: 64,
        marginBottom: -2,
        borderWidth: 1,
        borderColor: AppColors.backgroundLight,
    },
    darkShade: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: AppColors.darkShade,
        borderTopLeftRadius: 64,
        borderTopRightRadius: 64
    },
    body: {
        textAlignVertical: "center",
        textAlign: "center",
        flex: 1,
        paddingTop: 16,
        fontSize: 32,
        fontWeight: "normal",
        color: AppColors.textColor,
    },
    timeFrameInfo: {
        textAlignVertical: "center",
        textAlign: "center",
        flex: 1,
        fontSize: 16,
        fontWeight: "bold",
        color: AppColors.textColor,
        paddingBottom: 8
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
