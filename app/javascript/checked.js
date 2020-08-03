function check() {
  // クリックされる部分の要素を取得
  const posts = document.getElementsByClassName("post");
  // checked.jsに、取得したDOMを配列へ変換し、forEachを使用する処理
  postsA = Array.from(posts);

  // 投稿クリックのイベント時」に動作する処理
  postsA.forEach(function (post) {
    // addEventListenerメソッドを使用し、引数にclickの指定
    post.addEventListener("click", (e) => {
      // エンドポイントへのリクエスト処理
      // getAttributeで属性値data-idの値を取得
      const postId = post.getAttribute("data-id");
      // エンドポイントを呼び出すために、XMLHttpRequestを使用してHTTPリクエストを行う
      // オブジェクトを生成
      const XHR = new XMLHttpRequest();
      // どのようなリクエストをするのかを、openメソッドを使用してリクエストの詳細を指定する
      XHR.open("GET", `/posts/${postId}`, true);
      // レスポンスの形式を指定
      XHR.responseType = "json";
      // sendメソッドを記述して、リクエストが送信できるようにする
      XHR.send();
      // レスポンスなどの受信が成功した場合に呼び出されるイベントハンドラー記述
      XHR.onload = () => {
        // XHR.responseでレスポンスされてきたJSONにアクセス
        const item = XHR.response.post;
        // 既読であれば先ほどHTMLに定義した属性であるdata-checkの属性値にtrueをセット
        if (item.checked === true) {
          post.setAttribute("data-check", "true");
          // 未読であればdata-checkは属性ごと削除
        } else if (item.checked === false) {
          post.removeAttribute("data-check");
        }
        // checked.jsに、レスポンスがエラーだった場合の処理
        if (XHR.status != 200) {
          alert(`Error ${XHR.status}: ${XHR.statusText}`);
        } else {
          return null;
        }
        }
        // リクエストそのものに失敗したときの処理
        XHR.onerror = () => {
          alert("Request failed");
        };
    });
  });
}
window.addEventListener("load", check);
