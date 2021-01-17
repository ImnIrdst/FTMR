import moment from "moment-jalaali";

export const addLeadingZeros = (num: number) => {
    let str = num.toString();
    if (str.length == 1) return "0" + str;
    else return str;
};

export const formatEpoch = (start: moment.Moment, end:moment.Moment) => {
    let seconds = moment(end).diff(start, "seconds");
    let minutes = moment(end).diff(start, "minutes");
    return `${addLeadingZeros(minutes)}:${addLeadingZeros(seconds % 60)}`;
};
