// 送信ボタンをクリックした時のイベントハンドラーを定義
function memo () {
  // "submit"のidをgetElementByIdで取得
  const submit = document.getElementById("submit");
  // 「click」した場合に実行される関数を定義
  submit.addEventListener("click", (e) => {
    // フォームで入力された値を取得
    const formData = new FormData(document.getElementById("form"));
    // 非同期通信を実現するために必要なXMLHttpRequestのオブジェクトを生成
    const XHR = new XMLHttpRequest();
    // XMLHttpRequestを初期化
    XHR.open("POST", "/posts", true);
    // 返却されるデータ形式jsonを指定
    XHR.responseType = "json";
    // メモ投稿のフォームに入力された情報を送信
    XHR.send(formData);
  })
}
window.addEventListener("load", memo);

