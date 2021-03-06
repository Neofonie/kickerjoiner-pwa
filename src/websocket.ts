import { localStore } from './stores';
import { capitalizeFirstLetter } from './utils';

const wsApi = 'wss://kij.willy-selma.de/ws';
const pre = '[WSS]';
let pingTimeout = null;
let socket;

export function connectToWSS(updateCallback) {
    console.log(pre, 'connectToWSS', wsApi);
    socket = new WebSocket(wsApi);
    socket.onmessage = async (event) => {
        const data = event.data;
        console.log(pre, 'onmessage', JSON.parse(data))
        updateCallback(JSON.parse(data));
    };
    socket.onopen = heartbeat;
    socket.onping = heartbeat;
    socket.onerror = (e) => {
        console.error(pre, 'socket.error', e);
        updateCallback({ message: 'ERROR', error: e });
    };
    socket.onclose = (e) => {
        console.log(pre, 'socket.close', e);
        clearTimeout(pingTimeout);
        updateCallback({ message: 'CLOSE', error: e });
    };
    window.onbeforeunload = () => {
        socket.onclose = () => {
        }; // disable onclose handler first
        socket.close();
    };
}

export function sendMessage(data) {
    console.log(pre, 'sendMessage', data, socket)
    if (socket) {
        socket.send(JSON.stringify(data));
    }
}

export function sendClientNick(nickname) {
    /*
     parsedResult: {
         browser: {name: "Chrome", version: "87.0.4280.66"}
         engine: {name: "Blink"}
         os: {name: "Windows", version: "NT 10.0", versionName: "10"}
         platform: {type: "desktop"}
     }
    */
    // @ts-ignore TS2339: Property 'bowser' does not exist on type 'Window & typeof globalThis
    const browser = window.bowser.getParser(window.navigator.userAgent);
    if (nickname) {
        localStore.set('nickname', nickname);
        sendMessage({
            message: 'SET_CLIENTNICK',
            type: ['pwa', browser.parsedResult.os.name, browser.parsedResult.platform.type, browser.parsedResult.browser.name]
                .map(value => capitalizeFirstLetter(value))
                .join(' / '),
            nick: nickname,
        });
    }
}

function heartbeat() {
    console.log(pre, 'heartbeat');
    if (pingTimeout !== null) {
        clearTimeout(pingTimeout);
    }

    // Use `WebSocket#terminate()`, which immediately destroys the connection,
    // instead of `WebSocket#close()`, which waits for the close timer.
    // Delay should be equal to the interval at which your server
    // sends out pings plus a conservative assumption of the latency.
    pingTimeout = setTimeout(() => {
        if (socket) {
            //console.log('heartbeat.terminate');
            //socket.terminate();
        }
    }, 30000 + 1000);
}
