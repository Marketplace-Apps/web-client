export const get_ms_end_day = (d: Date) => d.getTime() - d.getHours() * 60 * 60000 - d.getMinutes() * 60000 - d.getSeconds() * 1000 + 24 * 60 * 60000 - 10