import { StatusBar } from "expo-status-bar";
import React from "react";
import { Button, SafeAreaView, StyleSheet, Text, NativeModules } from "react-native";

const {FtmrNotificationModule} = NativeModules

export default function App() {

    const onSendNotificationPressed = () => {
        console.log("Here")
        FtmrNotificationModule.showNotification("Ftmr", "Times up!")
    }

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar style="light" backgroundColor="black" />
            
            <Text style={styles.body}>00:00</Text>
            
            <Button title="Send Notification" onPress={onSendNotificationPressed} color="darkorange"/>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "black",
        alignItems: "center",
        justifyContent: "flex-end",
        paddingBottom: 64
    },
    body: {
        textAlignVertical: "center",
        flex: 1,
        padding: 32,
        fontSize: 64,
        color: "#eee",
    },
});
