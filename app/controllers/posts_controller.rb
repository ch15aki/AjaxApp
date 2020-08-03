class PostsController < ApplicationController
  def index
    @posts = Post.all.order(id: "DESC")  # すべてのレコードを@postsに代入
  end

  def create
    # 「メモ作成時に未読の情報を保存するよう変更」
    post = Post.create(content: params[:content], checked: false)
    # Ajaxを実現するため「レスポンスをJSONに変更」
    render json:{ post: post }
  end

  def checked
    post = Post.find(params[:id])

    if post.checked then
      post.update(checked: false)
    else
      post.update(checked: true)
    end

    item  = Post.find(params[:id])
    render json: { post: item }
  end
end
