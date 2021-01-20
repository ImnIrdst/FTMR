import moment from "moment-jalaali";

export const addLeadingZeros = (num: number) => {
    let str = num.toString();
    if (str.length == 1) return "0" + str;
    else return str;
};

export const formatEpoch = (start: moment.Moment, end:moment.Moment) => {
    let seconds = moment(end).diff(start, "seconds")% 60;
    let minutes = moment(end).diff(start, "minutes") % 60;
    let hours = moment(end).diff(start, "hours");
    return `${addLeadingZeros(hours)}:${addLeadingZeros(minutes)}:${addLeadingZeros(seconds % 60)}`;
};
