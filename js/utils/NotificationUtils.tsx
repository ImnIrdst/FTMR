import { NativeModules } from "react-native";

interface IFtmrNotificationModule {
    showNotification(title: String, content: String): void
}

const { FtmrNotificationModule } = NativeModules;
const NotificationModule = FtmrNotificationModule as IFtmrNotificationModule

export const sendNotification = () => {
    NotificationModule.showNotification("Ftmr", "Times up!")
};
