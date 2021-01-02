import { StatusBar } from "expo-status-bar";
import React from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";

export default function App() {
    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.body}>00:00</Text>
            <StatusBar style="light" backgroundColor="black" />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "black",
        alignItems: "center",
        justifyContent: "center",
    },
    body: {
        fontSize: 32,
        color: "#eee",
    },
});
