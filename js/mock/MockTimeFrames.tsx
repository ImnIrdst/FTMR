import { TimeFrameData, Todo } from "../components/timeframe/TimeFrameData";

const today = new Date();
today.getTimezoneOffset();
today.setHours(0);
today.setMinutes(0);
today.setSeconds(0);
today.toLocaleString();

const todos: Todo[] = []

let _ = [
    { text: "- change timer play icon state to repeat" },
    { text: "- Add time frame text (9:00, 9:30, ...)" },
    { text: "- Add increase and decrease timer duration" },
    { text: "- Add todos and persist data" },
    { text: "- Add todos and checkboxes" },
    { text: "- Add cross line on done todos" },
    { text: "- Add buttons for sound profile" },
    { text: "- Add tag manager screen" },
    { text: "- Use material bottom bar for timer" },
].forEach((element, index) => {
    todos.push(new Todo(index, element.text));
});



export const mockTimeFrames: TimeFrameData[] = []

for (let i = 0; i < 5; i++) {
    const date = new Date(today);
    date.setMinutes(date.getMinutes() + i * 30);
    mockTimeFrames.push(new TimeFrameData(i, ["Tag1, Tag2"], date, todos));
};