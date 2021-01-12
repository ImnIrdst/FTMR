import moment from "moment";

export const timeFrameDurationMinutes = 30;
export class Todo {
    key: number;
    text: string;
    isChecked: boolean;

    constructor(key: number, text: string, isChecked: boolean) {
        this.key = key;
        this.text = text;
        this.isChecked = isChecked;
    }
}
export class TimeFrameData {
    key: string;
    tags: string[];
    date: Date;
    todos: Todo[];

    constructor(key: string, tags: string[], date: Date, todos: Todo[]) {
        this.key = key;
        this.tags = tags;
        this.date = date;
        this.todos = todos;
    }

    getStartTime = () => moment(this.date).format("HH:mm");
    getEndTime = () => moment(this.date).add(timeFrameDurationMinutes, "minutes").format("HH:mm");
}
