import { format } from "date-fns"

/**
 * @param date A native JavaScript Date.
 * @returns A string compatible with the HTML5 Date Input format.
 */
export const dateToHTMLFormat = (date: Date) => format(date, "YYYY-MM-DD")