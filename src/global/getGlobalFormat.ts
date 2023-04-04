import { App } from "vue";
import { formatUtcString } from "@/utils/dayjs";

export default function getGlobalFormatTime(app: App) {
  const DEFAULTFORMAT = "YYYY-MM-DD HH:mm:ss";
  app.config.globalProperties.$filters = {
    formatTime: (timer: string, format: string = DEFAULTFORMAT) => {
      return formatUtcString(timer, format);
    }
  }
}