import { StatusBar } from "expo-status-bar";
import React from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";

export default function App() {
    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.body}>
                Open up App.tsx asdasdto star st working on your app!
            </Text>
            <StatusBar style="auto" />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#000",
        alignItems: "center",
        justifyContent: "center",
    },
    body: {
        fontSize: 16,
        color: "#eee",
    },
});
