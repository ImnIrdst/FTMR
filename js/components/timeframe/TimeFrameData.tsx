import moment from "moment-jalaali";
import {AppColors, TagColor} from "../../resources/Colors";

export const timeFrameDurationMinutes = 120;
export const restDurationMinutes = 56;

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

    public toString = (): string => {
        return JSON.stringify(this)
    }
}

export class TimeFrameData {
    key: string;
    tags: TagData[];
    startDate: moment.Moment;
    endDate: moment.Moment;
    todos: TodoData[];
    hasAlarm: boolean;

    focusEndDate = () => moment(this.endDate).subtract(restDurationMinutes, "minutes")
    restStartDate = () => moment(this.startDate).subtract(restDurationMinutes, "minutes")

    constructor(key: string, tags: TagData[], startDate: moment.Moment, endDate: moment.Moment, todos: TodoData[], hasAlarm: boolean) {
        this.key = key;
        this.tags = tags;
        this.startDate = startDate;
        this.endDate = endDate;
        this.todos = todos;
        this.hasAlarm = hasAlarm;
    }

    isCurrentTimeFrame = () => {
        const diff = moment().diff(this.startDate, "minute");
        return 0 <= diff && diff < moment(this.endDate).diff(this.startDate, "minute");
    };
    isInFocusRange = () => {
        const diff = moment().diff(this.startDate, "minute");
        return 0 <= diff && diff < moment(this.endDate).subtract(restDurationMinutes, "minutes").diff(this.startDate, "minute");
    };
    getStartTimeFormatted = () => this.startDate.format("HH:mm");
    getEndTimeFormatted = () => this.endDate.format("HH:mm");
    getFocusEndTimeFormatted = () => this.focusEndDate().format("HH:mm");
    getTimeRangeFormatted = () => `${this.getStartTimeFormatted()} - ${this.getEndTimeFormatted()}`
    getFocusTimeRangeFormatted = () => `${this.getStartTimeFormatted()} - ${this.getFocusEndTimeFormatted()}`
    getRestTimeRangeFormatted = () => `${this.getFocusEndTimeFormatted()} - ${this.getEndTimeFormatted()}`

    getTitle = () => this.tags.map((it) => it.title).join(", ")
    getTodos = () => this.todos.filter(it => !it.isChecked).map((it) => "- " + it.text).join("\n")

    getStartTimeId = () => this.startDate.valueOf() % 1e9 + 7
    getRestTimeId = () => this.restStartDate().valueOf() % 1e9 + 7

    getActiveColor = () => {
        if (this.tags.length > 0) {
            return this.tags[0].backgroundColor.active
        } else {
            return AppColors.backgroundLight
        }
    }

    getInactiveColor = () => {
        if (this.tags.length > 0) {
            return this.tags[0].backgroundColor.inactive
        } else {
            return AppColors.backgroundLighter
        }
    }

    toString = () => {
        return `${this.key} ${this.getTitle()} ${this.getTimeRangeFormatted()}`
    }
}

export const compareTimeFrames = (a: TimeFrameData, b: TimeFrameData) => {
    return a.startDate.valueOf() - b.startDate.valueOf()
}
