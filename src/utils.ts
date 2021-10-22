const onlineApi = 'https://kij.willy-selma.de/db';

export async function db(method: string, url: string, data?: any) {
    return await fetch(onlineApi + url, {
        method,
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    }).then((res) => res.json());
}

export function HRDate(timestamp) {
    const a = new Date(timestamp * 1000);
    const year = a.getFullYear();
    const month = (a.getMonth() + 1).toString().padStart(2, '0');
    const day = a.getDate().toString().padStart(2, '0');
    const hour = a.getHours().toString().padStart(2, '0');
    const min = a.getMinutes().toString().padStart(2, '0');
    return `${day}.${month}.${year} ${hour}:${min}`;
}

export function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}


