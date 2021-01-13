import moment from "moment-jalaali";
import { TimeFrameData, Todo, timeFrameDurationMinutes } from "../components/timeframe/TimeFrameData";

const today = new Date();
today.getTimezoneOffset();
today.setHours(0);
today.setMinutes(0);
today.setSeconds(0);
today.toLocaleString();

const todos: Todo[] = []

let _ = [
    { text: "- Add expanded and collapsed card state", isChecked: false },
    { text: "- Todo checkboxes", isChecked: false },
    { text: "- Hide done todos", isChecked: false },
    { text: "- card background color", isChecked: false },
    { text: "- Add current time indicator", isChecked: false },
    { text: "- Restructure the app", isChecked: false }, // https://cheesecakelabs.com/blog/efficient-way-structure-react-native-projects/
    { text: "- Navigate to tag selection screen", isChecked: false },
    { text: "- Add success percentage", isChecked: false },
    { text: "- Add What you spend your time on instead", isChecked: false },
    { text: "- Add todos and persist data", isChecked: false },
    { text: "- Remove todos", isChecked: false },
    { text: "- Add tag manager screen", isChecked: false },
    { text: "- Click on the header and open calendar", isChecked: false },
    { text: "- Add charts", isChecked: false },

    { text: "- Add buttons for sound profile", isChecked: true },
    { text: "- Add cross line on done todos", isChecked: true },
    { text: "- Add Today date header", isChecked: true },
    { text: "- Hide header with scroll", isChecked: true },
    { text: "- Redesign Bottom bar", isChecked: true },
    { text: "- Create day component", isChecked: true },
    { text: "- Add next and previous date button", isChecked: true },
    { text: "- Change timer play icon state to repeat", isChecked: true },
].forEach((element, index) => {
    todos.push(new Todo(index, element.text, element.isChecked));
});



export const mockTimeFrames: TimeFrameData[] = []

for (let i = 0; i < 48; i++) {
    const date = moment(new Date(today));
    date.add(i * timeFrameDurationMinutes, "minute");
    mockTimeFrames.push(new TimeFrameData(i.toString(), ["Tag1, Tag2"], date, todos));
};
