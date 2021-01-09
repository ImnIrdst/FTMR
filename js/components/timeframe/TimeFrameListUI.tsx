import React from "react";
import { StyleSheet } from "react-native";
import { TimeFrameItemUI } from "./TimeFrameItemUI";
import { ScrollView } from "react-native-gesture-handler";
import { TimeFrameData } from "./TimeFrameData";

interface Props {
    timeFrames: TimeFrameData[];
}

export class TimeFrameListUI extends React.Component<Props> {
    
    getTimeFrames = () => this.props.timeFrames;
    
    render = () => (
        <ScrollView style={styles.fillWidth}>
            {this.getTimeFrames().map((timeFrame) => (
                <TimeFrameItemUI {...timeFrame} />
            ))}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    fillWidth: {
        flex: 1,
        alignSelf: "stretch",
    },
});
