import React from "react";
import { StyleSheet, View, ViewStyle, Animated } from "react-native";
import { TimeFrameItemUI } from "./TimeFrameItemUI";
import { ScrollView } from "react-native-gesture-handler";
import { TimeFrameData } from "./TimeFrameData";
import { AppColors } from "../../resources/Colors";
import { bottomBarHeight } from "../timer/CountDownTimer";

interface Props {
    style: ViewStyle;
    topPadding: number;
    bottomPadding: number;
    timeFrames: TimeFrameData[];
    scrollX: Animated.Value;
}

export class TimeFrameListUI extends React.Component<Props> {
    scrollViewAnimatedEvent = Animated.event(
        [
            {
                nativeEvent: {
                    contentOffset: {
                        y: this.props.scrollX,
                    },
                },
            },
        ],
        { useNativeDriver: false }
    );

    getTimeFrames = () => this.props.timeFrames;

    render = () => (
        <View style={this.props.style}>
            <ScrollView scrollEventThrottle={1} onScroll={this.scrollViewAnimatedEvent}>
                <View style={{ height: this.props.topPadding }}></View>
                {this.getTimeFrames().map((timeFrame) => (
                    <TimeFrameItemUI style={styles.itemContainer} {...timeFrame} />
                ))}
                <View style={{ height: this.props.bottomPadding }}></View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    itemContainer: {
        alignSelf: "stretch",
        backgroundColor: AppColors.backgroundLight,
        marginHorizontal: 16,
        marginVertical: 8,
        padding: 8,
        flex: 1,
        alignItems: "flex-start",
        borderRadius: 16,
    },
});
