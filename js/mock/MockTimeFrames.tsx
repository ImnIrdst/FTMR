import moment from "moment-jalaali";
import {TimeFrameData, TodoData, timeFrameDurationMinutes, TagData} from "../components/timeframe/TimeFrameData";
import {AppColors} from "../resources/Colors";

const today = new Date();
today.getTimezoneOffset();
today.setHours(0);
today.setMinutes(0);
today.setSeconds(0);
today.toLocaleString();

const todos: TodoData[] = []

let todosWithoutKey = [

    {text: "Add current time indicator", isChecked: false},
    {text: "Restructure the app", isChecked: false}, // https://cheesecakelabs.com/blog/efficient-way-structure-react-native-projects/
    {text: "Navigate to tag selection screen", isChecked: false},
    {text: "Add success percentage", isChecked: false},
    {text: "Add What you spend your time on instead", isChecked: false},
    {text: "Add todos and persist data", isChecked: false},
    {text: "Remove todos", isChecked: false},
    {text: "Add tag manager screen", isChecked: false},
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
]
todosWithoutKey.forEach((element, index) => {
    todos.push(new TodoData(index, element.text, element.isChecked));
});

const tags: TagData[] = [
    {title: "red", backgroundColor: AppColors.tagColors.red},
    {title: "pink", backgroundColor: AppColors.tagColors.pink},
    {title: "purple", backgroundColor: AppColors.tagColors.purple},
    {title: "lightBlue", backgroundColor: AppColors.tagColors.lightBlue},
    {title: "teal", backgroundColor: AppColors.tagColors.teal},
    {title: "green", backgroundColor: AppColors.tagColors.green},
    {title: "lime", backgroundColor: AppColors.tagColors.lime},
    {title: "amber", backgroundColor: AppColors.tagColors.amber},
    {title: "deepOrange", backgroundColor: AppColors.tagColors.deepOrange},
    {title: "brown", backgroundColor: AppColors.tagColors.brown},
    {title: "blueGrey", backgroundColor: AppColors.tagColors.blueGrey},
]


export const mockTimeFrames: TimeFrameData[] = []

for (let i = 0; i < 12; i++) {
    const date = moment(new Date(today));
    date.add(i * timeFrameDurationMinutes, "minute");
    mockTimeFrames.push(new TimeFrameData(i.toString(), [tags[i % tags.length]], date, todos));
}
