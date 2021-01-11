import { TimeFrameData, Todo, timeFrameDurationMinutes } from "../components/timeframe/TimeFrameData";

const today = new Date();
today.getTimezoneOffset();
today.setHours(0);
today.setMinutes(0);
today.setSeconds(0);
today.toLocaleString();

const todos: Todo[] = []

let _ = [
    { text: "- Hide header with scroll", isChecked: false },
    { text: "- Add next and previous date button", isChecked: false },
    { text: "- Redesign Bottom bar", isChecked: false },
    { text: "- Change timer play icon state to repeat", isChecked: false },
    { text: "- Add increase and decrease timer duration", isChecked: false },
    { text: "- Add todos and persist data", isChecked: false },
    { text: "- Add todos and checkboxes", isChecked: false },
    { text: "- Add tag manager screen", isChecked: false },
    { text: "- Use material bottom bar for timer", isChecked: false },
    { text: "- Add buttons for sound profile", isChecked: true },
    { text: "- Add cross line on done todos", isChecked: true },
    { text: "- Add Today date header", isChecked: true },
].forEach((element, index) => {
    todos.push(new Todo(index, element.text, element.isChecked));
});



export const mockTimeFrames: TimeFrameData[] = []

for (let i = 0; i < 5; i++) {
    const date = new Date(today);
    date.setMinutes(date.getMinutes() + i * timeFrameDurationMinutes);
    mockTimeFrames.push(new TimeFrameData(i, ["Tag1, Tag2"], date, todos));
};