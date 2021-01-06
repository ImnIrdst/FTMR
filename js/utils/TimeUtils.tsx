export const currentTimeMilies = () => {
    return new Date().getTime();
};

export const addLeadingZeros = (num: number) => {
    let str = num.toString();
    if (str.length == 1) return "0" + str;
    else return str;
};

export const formatEpoch = (epoch: number) => {
    let seconds = Math.round(epoch / 1000);
    let minutes = Math.round(seconds / 60);
    return `${addLeadingZeros(minutes)}:${addLeadingZeros(seconds % 60)}`;
};
