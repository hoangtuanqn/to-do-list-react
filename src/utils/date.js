export function getDateTime() {
    return new Date().toLocaleString("vi-VN", { hour12: false }).replace(",", " -");
}
