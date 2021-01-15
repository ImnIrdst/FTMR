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
    startDate: moment.Moment;
    endDate: moment.Moment;
    todos: TodoData[];

    constructor(key: string, tags: TagData[], startDate: moment.Moment, endDate: moment.Moment, todos: TodoData[]) {
        this.key = key;
        this.tags = tags;
        this.startDate = startDate;
        this.endDate = endDate;
        this.todos = todos;
    }

    isCurrentTimeFrame = () => {
        const diff = moment().diff(this.startDate, "minute");
        return 0 <= diff && diff < timeFrameDurationMinutes;
    };
    getStartTime = () => this.startDate.format("HH:mm");
    getEndTime = () => this.endDate.format("HH:mm");
    getTimeRange = () => `${this.getStartTime()} - ${this.getEndTime()}`

    toString = () => {
        return `${this.key} ${this.getTimeRange()}`
    }
}

export const compareTimeFrames = (a: TimeFrameData, b: TimeFrameData) => {
    return a.startDate.valueOf() - b.startDate.valueOf()
}
