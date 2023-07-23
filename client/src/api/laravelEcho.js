import Echo from "laravel-echo";
import Pusher from "pusher-js";

const echo = new Echo({
  broadcaster: "pusher",
  key: "12345",
  cluster: "mt1",
  forceTLS: false,
  wsHost: "localhost",
  wsPort: 6001,
  encrypted: false,
  enableTransports: ["ws", "wss"],
});

export default echo;
