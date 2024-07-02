
export function generateDate(date: string): string {
    const dt = new Date(date);
    const format = Intl.DateTimeFormat("en-us", {
        day: "2-digit",
        month: "short",
        year: "numeric",
    })

    return format.format(dt);
}