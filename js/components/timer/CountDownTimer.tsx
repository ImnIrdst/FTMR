import React from "react";
import {StyleSheet, Text, ViewStyle, Animated} from "react-native";
import {AppColors} from "../../resources/Colors";
import {formatEpoch} from "../../utils/TimeUtils";
import moment from "moment-jalaali";
import {mockTimeFrames} from "../../mock/MockTimeFrames";

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
        const currentTimeFrame = mockTimeFrames.find((it) => it.isCurrentTimeFrame())
        if (currentTimeFrame === undefined) {
            throw Error("Can not find current time frame")
        }

        return {
            startTime: currentTimeFrame.startDate,
            currentTime: moment().milliseconds(0),
            endTime: currentTimeFrame.endDate
        };
    }

    componentDidMount() {
       this.resetTimer()
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

    render = () => (
        <Animated.View
            style={[
                this.props.style,
                styles.container,
                {transform: [{translateY: this.getScrollTranslation()}]}
            ]}>

            <Text style={styles.body}>{formatEpoch(this.state.currentTime, this.state.endTime)}</Text>
        </Animated.View>
    );
}

const styles = StyleSheet.create({
    container: {
        height: bottomBarHeight,
        flexDirection: "row",
        backgroundColor: AppColors.backgroundLight,
        borderTopLeftRadius: 64,
        borderTopRightRadius: 64,
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
