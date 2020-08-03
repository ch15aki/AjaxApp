function check() {
  const posts = document.getElementsByClassName("post");
  postsA = Array.from(posts);

  postsA.forEach(function (post) {
    post.addEventListener("click", (e) => {
      const postId = post.getAttribute("data-id");
      const XHR = new XMLHttpRequest();
      XHR.open("GET", `/posts/${postId}`, true);
      XHR.responseType = "json";
      XHR.send();
    });
  });
}
window.addEventListener("load", check);
