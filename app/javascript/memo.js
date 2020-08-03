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
    // 「HTMLのメモ部分」を描画する処理
    XHR.onload = () => {
      // レスポンスとして返却されたメモのレコードデータを取得
      const item = XHR.response.post;
      // HTMLを描画する場所を指定する際に使用する「描画する親要素」のlistの要素を取得
      const list = document.getElementById("list");
      // 「メモの入力フォーム」をリセット
      const formText = document.getElementById("content")
      // 「メモとして描画する部分のHTML」を定義
      const HTML = `
        <div class="post" data-id=${item.id}>
          <div class="post-date">
            投稿日時：${item.created_at}
          </div>
          <div class="post-content">
          ${item.content}
          </div>
        </div>`;
      // listという要素に対して、insertAdjacentHTMLでHTMLを追加
      list.insertAdjacentHTML("afterend", HTML);
      // 空の文字列に上書き
      formText.value = "";
      // 200以外のHTTPステータスが返却された場合の処理
      if (XHR.status != 200) {
        alert(`Error ${XHR.status}: ${XHR.statusText}`);
      } else {
        return null;
      }
    };
    // レスポンスが失敗した場合の処理
    XHR.onerror = function () {
      alert("Request failed");
    };
    e.preventDefault();
  })
}
window.addEventListener("load", memo);

