import React from "react";
import Constants from "expo-constants";
import { View, StyleSheet } from "react-native";
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
            {/* <View> */}
            {this.getTimeFrames().map((timeFrame) => (
                <TimeFrameItemUI data={timeFrame} />
            ))}
            {/* </View> */}

            {/* <Text style={{ color: "white", fontSize: 64 }}>asdasd</Text>
                <Text style={{ color: "white", fontSize: 64 }}>asdasd</Text>
                <Text style={{ color: "white", fontSize: 64 }}>asdasd</Text>
                <Text style={{ color: "white", fontSize: 64 }}>asdasd</Text>
                <Text style={{ color: "white", fontSize: 64 }}>asdasd</Text>
                <Text style={{ color: "white", fontSize: 64 }}>asdasd</Text>
                <Text style={{ color: "white", fontSize: 64 }}>asdasd</Text> */}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    fillWidth: {
        flex: 1,
        alignSelf: "stretch",
    },
});
