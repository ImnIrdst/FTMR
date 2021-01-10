import React from "react";
import { StyleSheet, ViewStyle } from "react-native";
import { TimeFrameItemUI } from "./TimeFrameItemUI";
import { ScrollView } from "react-native-gesture-handler";
import { TimeFrameData } from "./TimeFrameData";

interface Props {
    style: ViewStyle;
    timeFrames: TimeFrameData[];
}

export class TimeFrameListUI extends React.Component<Props> {
    getTimeFrames = () => this.props.timeFrames;

    render = () => (
        <ScrollView style={this.props.style}>
            {this.getTimeFrames().map((timeFrame) => (
                <TimeFrameItemUI style={styles.itemContainer} {...timeFrame} />
            ))}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    itemContainer: {
        alignSelf: "stretch",
        backgroundColor: "red",
        flex: 1,
        alignItems: "flex-start",
    },
});
