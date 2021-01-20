import moment from "moment-jalaali";
import {
    TimeFrameData,
    TodoData,
    timeFrameDurationMinutes,
    TagData
} from "../components/timeframe/TimeFrameData";
import {AppColors} from "../resources/Colors";

const today = new Date();
today.getTimezoneOffset();
today.setHours(0);
today.setMinutes(0);
today.setSeconds(0);
today.setMilliseconds(0);
today.toLocaleString();

const todos: TodoData[] = []

let todosWithoutKey = [
    {text: "Navigate to tag selection screen", isChecked: false},
    {text: "Add tag manager screen", isChecked: false},
    {text: "Add todos and persist data", isChecked: false},
    {text: "Restructure the app", isChecked: false}, // https://cheesecakelabs.com/blog/efficient-way-structure-react-native-projects/
    {text: "Add success percentage", isChecked: false},
    {text: "Add What you spend your time on instead", isChecked: false},
    {text: "Remove todos", isChecked: false},
    {text: "Click on the header and open calendar", isChecked: false},
    {text: "Add charts", isChecked: false},

    {text: "Add buttons for sound profile", isChecked: true},
    {text: "Add cross line on done todos", isChecked: true},
    {text: "Add Today date header", isChecked: true},
    {text: "Hide header with scroll", isChecked: true},
    {text: "Redesign Bottom bar", isChecked: true},
    {text: "Create day component", isChecked: true},
    {text: "Add next and previous date button", isChecked: true},
    {text: "Change timer play icon state to repeat", isChecked: true},
    {text: "Add expanded and collapsed card state", isChecked: true},
    {text: "Scroll to today card", isChecked: true},
    {text: "Add merge and split buttons", isChecked: true},
    {text: "Todo checkboxes", isChecked: true},
    {text: "Hide done todos", isChecked: true},
    {text: "Fix scroll when done todos are collapsed", isChecked: true},
    {text: "Add Card background color", isChecked: true},
    {text: "Add current time indicator", isChecked: true},
    {text: "Go to current timeframe", isChecked: true},
]
todosWithoutKey.forEach((element, index) => {
    todos.push(new TodoData(index, element.text, element.isChecked));
});

const tags: TagData[] = [
    {title: "Red", backgroundColor: AppColors.tagColors.red},
    {title: "Pink", backgroundColor: AppColors.tagColors.pink},
    {title: "Purple", backgroundColor: AppColors.tagColors.purple},
    {title: "LightBlue", backgroundColor: AppColors.tagColors.lightBlue},
    {title: "Teal", backgroundColor: AppColors.tagColors.teal},
    {title: "Green", backgroundColor: AppColors.tagColors.green},
    {title: "Lime", backgroundColor: AppColors.tagColors.lime},
    {title: "Amber", backgroundColor: AppColors.tagColors.amber},
    {title: "DeepOrange", backgroundColor: AppColors.tagColors.deepOrange},
    {title: "Brown", backgroundColor: AppColors.tagColors.brown},
    {title: "BlueGrey", backgroundColor: AppColors.tagColors.blueGrey},
]


export const mockTimeFrames: TimeFrameData[] = []

for (let i = 0; i < 12; i++) {
    const startDate = moment(new Date(today)).add(i * timeFrameDurationMinutes, "minute");
    const endDate = moment(startDate).add(timeFrameDurationMinutes, "minute")
    mockTimeFrames.push(new TimeFrameData(
        i.toString(),
        [tags[i % tags.length]],
        startDate,
        endDate,
        todos,
        false
    ));
}
