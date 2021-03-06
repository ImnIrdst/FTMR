import React, {createRef, RefObject} from "react";
import {StyleSheet, View, ViewStyle, Animated} from "react-native";
import {TimeFrameItemUI} from "./TimeFrameItemUI";
import {ScrollView} from "react-native-gesture-handler";
import {AppColors} from "../../resources/Colors";
import {TimeFrameData} from "./TimeFrameData";

interface Props {
    style: ViewStyle;
    topPadding: number;
    bottomPadding: number;
    timeFrames: TimeFrameData[];
    scrollX: Animated.Value;
    sendMessage?: (message: String) => void;
}

export class TimeFrameListUI extends React.Component<Props> {

    scrollViewRef = createRef<ScrollView>();

    timeFrameItemsRef: {
        [k: string]: RefObject<TimeFrameItemUI>
    } = {};

    state = {
        scrollViewAnimatedEvent: undefined
    }

    scrollToTodayFinished = false

    constructor(props: Props) {
        super(props);

        this.getTimeFrames().map(timeFrame => this.timeFrameItemsRef[timeFrame.key] = createRef())
    }

    setAnimatedScrollY = () => {
        // noinspection JSSuspiciousNameCombination
        this.setState({
            scrollViewAnimatedEvent: Animated.event(
                [
                    {
                        nativeEvent: {
                            contentOffset: {
                                y: this.props.scrollX,
                            },
                        },
                    },
                ],
                {useNativeDriver: false}
            ),
        })
    }

    getTimeFrames = () => this.props.timeFrames;


    forceScrollToToday = () => {
        this.scrollToTodayFinished = false
        this.scrollToToday()
    }

    scrollToToday = () => {
        if (this.scrollToTodayFinished) {
            return
        }

        this.setState({scrollViewAnimatedEvent: undefined})

        let sum = 0;
        for (let i = 0; i < this.getTimeFrames().length; i++) {

            const timeFrame = this.timeFrameItemsRef[i].current

            if (timeFrame === null) continue;

            if (timeFrame.isExpanded()) {
                break;
            }
            sum += timeFrame.height + 16;
        }

        this.scrollViewRef.current?.scrollTo({x: 0, y: sum, animated: true});
        this.scrollToTodayFinished = true
        setTimeout(() => {
            this.setAnimatedScrollY()
        }, 1000)
    }

    render = () => (
        <View style={this.props.style}>
            <ScrollView
                ref={this.scrollViewRef}
                contentContainerStyle={{
                    paddingTop: this.props.topPadding,
                    paddingBottom: this.props.bottomPadding,
                }}
                onScroll={this.state.scrollViewAnimatedEvent}
                onContentSizeChange={this.scrollToToday}>
                {
                    this.getTimeFrames()
                        .map((timeFrame) => this.renderItem(timeFrame))
                }
            </ScrollView>
        </View>
    );

    renderItem = (item: TimeFrameData) => (
        <TimeFrameItemUI
            sendMessage={this.props.sendMessage}
            ref={this.timeFrameItemsRef[item.key]}
            style={styles.itemContainer}
            {...item}
        />
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
