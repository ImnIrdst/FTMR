import React from "react";
import { StyleSheet, View, ViewStyle } from "react-native";
import { TimeFrameItemUI } from "./TimeFrameItemUI";
import { ScrollView } from "react-native-gesture-handler";
import { TimeFrameData } from "./TimeFrameData";
import { Colors } from "../../resources/Colors";

interface Props {
    style: ViewStyle;
    timeFrames: TimeFrameData[];
}

export class TimeFrameListUI extends React.Component<Props> {
    getTimeFrames = () => this.props.timeFrames;

    render = () => (
        <View style={this.props.style}>
            <ScrollView >
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
        backgroundColor: Colors.gray900,
        marginHorizontal: 16,
        marginVertical: 8,
        padding: 8,
        flex: 1,
        alignItems: "flex-start",
        borderRadius: 16
    },
});
