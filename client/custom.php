<?php
function get_current_user_id() {
  // 例えば、セッションにユーザーIDを保存しているとします。
  // この場合、以下のようにセッションからユーザーIDを取得することができます。
  if (isset($_SESSION['user_id'])) {
      return $_SESSION['user_id'];
  }

  // ユーザーがログインしていない場合やセッションが存在しない場合はnullを返します。
  return null;
}

function get_current_group_id() {
  // セッションからグループIDを取得
  if (isset($_SESSION['group_id'])) {
      return $_SESSION['group_id'];
  }

  // グループIDが存在しない場合はnullを返す
  return null;
}

$userId = get_current_user_id();  // ユーザーIDを取得する関数。実際の関数はシステムによります。
$groupId = get_current_group_id(); // グループIDを取得する関数。実際の関数はシステムによります。
?>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
</head>
<body>
  <textarea id="messages" rows="20" cols="30"></textarea>
  <br>
  <input id="input" type="text">
  <button onclick="sendMessage()">Send</button>

  <script>
    
    const userId = <?php echo json_encode($userId); ?>;
    const groupId = <?php echo json_encode($groupId); ?>;
    
    // WebSocket クライアントのインスタンスを作成
    const socket = new WebSocket('ws://localhost:8080');

    // メッセージ受信時のイベントリスナーを設定
    socket.addEventListener('message', function (event) {
      let data = JSON.parse(event.data);

      // メッセージを表示するエリアの取得
      const messagesArea = document.getElementById('messages');

      // 受信したメッセージを表示エリアに追加
      messagesArea.value += `\nUser ${data.userId}: ${data.message} at ${new Date(data.timestamp).toLocaleString()}`;
    });

    // メッセージを送信する関数
    function sendMessage() {
      const inputField = document.getElementById('input');
      const message = inputField.value;
      const timestamp = Date.now();  // 送信時刻を取得
      socket.send(JSON.stringify({ message, userId, groupId, timestamp })); // userIdとgroupIdをメッセージに含めて送信
      inputField.value = '';
    }
  </script>
</body>
</html>
