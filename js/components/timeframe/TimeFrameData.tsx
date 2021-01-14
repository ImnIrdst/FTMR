import moment from "moment-jalaali";

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

    public toString = () : string => {
        return JSON.stringify(this)
    }
}

export class TimeFrameData {
    key: string;
    tags: string[];
    date: moment.Moment;
    todos: Todo[];

    constructor(key: string, tags: string[], date: moment.Moment, todos: Todo[]) {
        this.key = key;
        this.tags = tags;
        this.date = date;
        this.todos = todos;
    }

    isCurrentTimeFrame = () => {
        const diff = moment().diff(this.date, "minute");
        return 0 <= diff && diff < 30;
    };
    getStartTime = () => this.date.format("HH:mm");
    getEndTime = () => this.date.add(timeFrameDurationMinutes, "minutes").format("HH:mm");
}

export const compareTimeFrames = (a: TimeFrameData, b: TimeFrameData) => a.date.diff(b.date, "minute")
