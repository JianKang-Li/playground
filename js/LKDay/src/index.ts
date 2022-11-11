import Lday from "./LDay";
import * as dayjs from "dayjs";
import * as weekOfYear from "dayjs/plugin/weekOfYear";
import * as toArray from "dayjs/plugin/toArray";
dayjs.extend(weekOfYear);
dayjs.extend(toArray);

let date1 = Lday();
let date2 = dayjs();
console.log("dayjs", date2.add(23, "M").get("M"));
console.log("LDay", date1.add(23, "M").get("M"));
console.log("dayjs", date2.toArray());
console.log("LDay", date1.toArray());
console.log(date1);
