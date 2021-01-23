import React, {createRef} from "react";
import moment from "moment-jalaali";
import {StyleSheet, View, Text, Animated, ViewStyle} from "react-native";
import {mockTimeFrames} from "../../mock/MockTimeFrames";
import {bottomBarHeight} from "../timer/CountDownTimer";
import {TimeFrameListUI} from "../timeframe/TimeFrameListUI";
import {AppColors} from "../../resources/Colors";
import {ToolbarButtonUI} from "../button/ToolbarButtonUI";
import {Snackbar} from "react-native-paper";

export const headerHeight = 128;

interface Props {
    style: ViewStyle;
    scrollY: Animated.Value;
}

interface State {
    currentTime: moment.Moment
    snackbarMessage: String,
}

export class DayUI extends React.Component<Props, State> {

    listRef = createRef<TimeFrameListUI>()

    state = {
        currentTime: moment(),
        snackbarMessage: "",
    }

    getHeaderTranslation = () => {
        const diffClamp = Animated.diffClamp(this.props.scrollY, 0, headerHeight);
        return Animated.multiply(-1, diffClamp);
    };

    getHeaderTranslationStyle = () => {
        return {transform: [{translateY: this.getHeaderTranslation()}]};
    };

    getGregorianDate = () => moment().format("Do MMMM YYYY");

    getJalaaliDate = () => moment().format("jDo jMMMM  jYYYY");

    onPrevDayPress = () => {
        this.showMessage("Not implemented")
    };

    onNextDayPress = () => {
        this.showMessage("Not implemented")
    };

    goToCurrent = () => {
        this.listRef.current?.forceScrollToToday()
    }

    private showMessage = (message: String) => {
        this.setState({snackbarMessage: message})
    };

    dismissSnackBar = () => {
        this.setState({snackbarMessage: ""})
    }

    render = () => (
        <View style={[this.props.style, styles.container]}>
            <Animated.View style={[styles.headerContainer, this.getHeaderTranslationStyle()]}>
                <ToolbarButtonUI style={styles.headerIcons} icon={"chevron-left"} onPress={this.onPrevDayPress}/>
                <View style={styles.dateContainer}>
                    <Text style={styles.gregorianDate}>{this.getGregorianDate()}</Text>
                    <Text style={styles.jalaaliDate}>{this.getJalaaliDate()}</Text>
                </View>
                <ToolbarButtonUI style={styles.headerIcons} icon={"chevron-right"} onPress={this.onNextDayPress}/>
            </Animated.View>

            {/*// @ts-ignore*/}
            <Snackbar visible={this.state.snackbarMessage.length !== 0}
                      duration={Snackbar.DURATION_LONG}
                      onDismiss={this.dismissSnackBar}
                      theme={{colors: {accent: AppColors.primaryColor}}}
                      action={{
                          label: "Dismiss",
                          accessibilityLabel: "dismiss",
                          onPress: this.dismissSnackBar,
                      }}
                      style={styles.snackbar}>{this.state.snackbarMessage}</Snackbar>

            <TimeFrameListUI
                sendMessage={this.showMessage}
                ref={this.listRef}
                style={styles.todosContainer}
                timeFrames={mockTimeFrames}
                scrollX={this.props.scrollY}
                topPadding={headerHeight}
                bottomPadding={bottomBarHeight}/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "black",
    },
    headerContainer: {
        flexDirection: "row",
        position: "absolute",
        backgroundColor: AppColors.background,
        top: 0,
        left: 0,
        right: 0,
        zIndex: 10,
        height: headerHeight,
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 16,
    },
    dateContainer: {
        marginHorizontal: 8,
    },
    gregorianDate: {
        fontSize: 32,
        color: AppColors.textColor,
        textAlign: "center",
    },
    jalaaliDate: {
        fontSize: 16,
        color: AppColors.textColor,
        textAlign: "center",
    },
    headerIcons: {},
    todosContainer: {
        flex: 1,
        alignSelf: "stretch",
    },
    snackbar: {
        flex: 1,
        zIndex: 100,
        backgroundColor: AppColors.backgroundLight,
        justifyContent: "center",
        alignContent: "center",
        alignItems: "center",
        marginHorizontal: 32,
        marginBottom: bottomBarHeight + 16,
    },

});
