import md5 from "js-md5";
const date = new Date();
const year = String(date.getUTCFullYear());
const month =
  date.getUTCMonth() + 1 < 10
    ? "0" + (date.getUTCMonth() + 1)
    : String(date.getUTCMonth() + 1);
const day =
  date.getUTCDate() < 10 ? "0" + date.getUTCDate() : String(date.getUTCDate());
export const dateUTC = year + month + day;

export const API_LINK = "https://api.valantis.store:40000/";
export const PASSWORD = md5(`Valantis_${dateUTC}`);
// export const PASSWORD = md5("Valantis_20240301");
export const HEADERS = {
  "X-Auth": PASSWORD,
  "Content-Type": "application/json",
};
