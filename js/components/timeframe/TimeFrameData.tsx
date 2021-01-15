import moment from "moment-jalaali";
import {TagColor} from "../../resources/Colors";

export const timeFrameDurationMinutes = 120;

export class TagData {
    title: string;
    backgroundColor: TagColor;

    constructor(title: string, backgroundColor: TagColor) {
        this.title = title;
        this.backgroundColor = backgroundColor;
    }
}

export class TodoData {
    key: number;
    text: string;
    isChecked: boolean;

    constructor(key: number, text: string, isChecked: boolean) {
        this.key = key;
        this.text = text;
        this.isChecked = isChecked;
    }

    public toString = () : string => {
        return JSON.stringify(this)
    }
}

export class TimeFrameData {
    key: string;
    tags: TagData[];
    date: moment.Moment;
    todos: TodoData[];

    constructor(key: string, tags: TagData[], date: moment.Moment, todos: TodoData[]) {
        this.key = key;
        this.tags = tags;
        this.date = date;
        this.todos = todos;
    }

    isCurrentTimeFrame = () => {
        const diff = moment().diff(this.date, "minute");
        return 0 <= diff && diff < timeFrameDurationMinutes;
    };
    getStartTime = () => this.date.format("HH:mm");
    getEndTime = () => this.date.add(timeFrameDurationMinutes, "minutes").format("HH:mm");
}

export const compareTimeFrames = (a: TimeFrameData, b: TimeFrameData) => a.date.diff(b.date, "minute")
