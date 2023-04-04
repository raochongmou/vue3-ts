import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);
const DEFAULFORMAT = "YYYY-MM-DD HH:mm:ss";

export function formatUtcString(timer: string, format: string = DEFAULFORMAT) {
  return dayjs.utc(timer).format(format);
}