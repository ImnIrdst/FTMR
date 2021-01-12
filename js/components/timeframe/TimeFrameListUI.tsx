import React from "react";
import { StyleSheet, View, ViewStyle, Animated, ListRenderItem, ListRenderItemInfo } from "react-native";
import { TimeFrameItemUI } from "./TimeFrameItemUI";
import { FlatList } from "react-native-gesture-handler";
import { TimeFrameData } from "./TimeFrameData";
import { AppColors } from "../../resources/Colors";

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

    renderItem = (item: ListRenderItemInfo<TimeFrameData>) => (
        <TimeFrameItemUI style={styles.itemContainer} {...item.item} />
    );

    render = () => (
        <View style={this.props.style}>
            <FlatList
                contentContainerStyle={{
                    paddingTop: this.props.topPadding,
                    paddingBottom: this.props.bottomPadding,
                }}
                data={this.getTimeFrames()}
                renderItem={this.renderItem}
                scrollEventThrottle={1}
                onScroll={this.scrollViewAnimatedEvent}
            />
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
    flatListContentContainerStyle: {},
});
