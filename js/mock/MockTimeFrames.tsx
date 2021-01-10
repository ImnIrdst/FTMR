import { TimeFrameData, Todo } from "../components/timeframe/TimeFrameData";

const todos: Todo[] = []

let _ = [
    "- change timer play icon state to repeat",
    "- Add time frame text (9:00, 9:30, ...)",
    "- Add increase and decrease timer duration",
    "- Add todos and checkboxes",
    "- Add cross line on done todos",
    "- Add buttons for sound profile",
    "- Add tag manager screen",
].forEach((element, index) => {
    todos.push({ key: index, text: element } as Todo);
});

const timeFrameWithoutId = {
    tags: ["Tag#1", "Tag#1"],
    todos: todos,
};

export const mockTimeFrames: TimeFrameData[] = []

for (let i = 0; i < 5; i++) {
    mockTimeFrames.push({ key: i, ...timeFrameWithoutId } as TimeFrameData);
}

