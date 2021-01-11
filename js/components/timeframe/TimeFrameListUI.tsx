import React from "react";
import { NativeScrollEvent, NativeSyntheticEvent, StyleSheet, View, ViewStyle, Animated } from "react-native";
import { TimeFrameItemUI } from "./TimeFrameItemUI";
import { ScrollView } from "react-native-gesture-handler";
import { TimeFrameData } from "./TimeFrameData";
import { Colors } from "../../resources/Colors";

interface Props {
    style: ViewStyle;
    topPadding: number;
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
    )

    getTimeFrames = () => this.props.timeFrames;

    render = () => (
        <View style={this.props.style}>
            <ScrollView
                scrollEventThrottle={1}
                onScroll={this.scrollViewAnimatedEvent}
                style={{ paddingTop: this.props.topPadding }}
            >

                {this.getTimeFrames().map((timeFrame) => (
                    <TimeFrameItemUI style={styles.itemContainer} {...timeFrame} />
                ))}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    itemContainer: {
        alignSelf: "stretch",
        backgroundColor: Colors.backgroundLight,
        marginHorizontal: 16,
        marginVertical: 8,
        padding: 8,
        flex: 1,
        alignItems: "flex-start",
        borderRadius: 16,
    },
});
