import { TimeFrameData, Todo } from "../components/timeframe/TimeFrameData";

const todos: Todo[] = []

let _ = [
    "- Add todos and checkboxes",
    "- Add cross line on done todos",
    "- Add buttons for sound profile",
    "- Add tag manager screen",
].forEach((element, index) => {
    todos.push({key: index, text: element} as Todo)
});

const timeFrameWithoutId = {
    tags: ["Tag#1", "Tag#1"],
    todos: todos,
};

export const mockTimeFrames: TimeFrameData[] = []

for(let i=0; i<3; i++) {
    mockTimeFrames.push(({ key: i, ...timeFrameWithoutId } as TimeFrameData))
}

