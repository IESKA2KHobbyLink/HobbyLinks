const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 8080 });

// group_idとそれに接続するクライアントのマッピングを保持するオブジェクト
const groupClients = {};

wss.on('connection', ws => {
  let currentGroupId;

  ws.on('message', message => {
    const data = JSON.parse(message);

    if (data.message && data.groupId) {
      // クライアントからメッセージとgroupIdが送られてきた場合
      currentGroupId = data.groupId;

      // groupClientsオブジェクトにこのgroupIdがなければ、新たな配列を作ります
      if (!groupClients[currentGroupId]) {
        groupClients[currentGroupId] = [];
      }

      // 現在のWebSocket接続がこのgroupIdにまだ存在していなければ追加します
      if (!groupClients[currentGroupId].includes(ws)) {
        groupClients[currentGroupId].push(ws);
      }

      // 同じgroupIdの他のクライアントにメッセージを送信します
      const otherClients = groupClients[currentGroupId];
      if (otherClients) {
        otherClients.forEach(client => {
          if (client !== ws && client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify(data));
          }
        });
      }
    }
  });

  ws.on('close', () => {
    // クライアントが接続を閉じたとき、そのクライアントをgroupClientsオブジェクトから削除します
    for (let groupId in groupClients) {
      groupClients[groupId] = groupClients[groupId].filter(client => client !== ws);
    }
  });
});

