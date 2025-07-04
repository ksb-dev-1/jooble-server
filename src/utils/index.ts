import { formatDistanceToNowStrict } from "date-fns";

export function formatMoney(amount: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
  })
    .format(amount)
    .slice(0, -3);
}

export function relativeDate(from: Date) {
  return formatDistanceToNowStrict(from, { addSuffix: true });
}
