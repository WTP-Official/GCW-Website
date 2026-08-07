function pad(value: number) {
  return value.toString().padStart(2, "0");
}

export function formatEventDate(value?: string) {
  if (!value) return undefined;
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return undefined;
  return `${pad(date.getDate())}/${pad(date.getMonth() + 1)}/${date.getFullYear()} ${pad(date.getHours())}:${pad(date.getMinutes())}`;
}

export function formatEventDateOnly(value?: string) {
  if (!value) return undefined;
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return undefined;
  return `${pad(date.getDate())}/${pad(date.getMonth() + 1)}/${date.getFullYear()}`;
}

export function formatEventTimeOnly(value?: string) {
  if (!value) return undefined;
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return undefined;
  return `${pad(date.getHours())}:${pad(date.getMinutes())}`;
}

export function formatEventMeta(item: {
  format?: string;
  eventDate?: string;
  duration?: string;
  location?: string;
}) {
  return [item.format, formatEventDate(item.eventDate), item.duration, item.location]
    .filter(Boolean)
    .join(" · ");
}
