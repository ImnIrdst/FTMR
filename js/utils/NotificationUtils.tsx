import { NativeModules } from "react-native";

const { FtmrNotificationModule } = NativeModules;

export const sendNotification = () => {
    FtmrNotificationModule.showNotification("Ftmr", "Times up!");
};
