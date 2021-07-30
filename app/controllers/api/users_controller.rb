class Api::UsersController < ApplicationController
  def create
    @user = User.create(user_params)
    if @user.save
      login!(@user)
      render :show
    else
      render json: @user.errors.full_messages, status: 401
    end
  end

  def index
    @users = User.with_attached_avatar
    render :index
  end

  def show
    @user = User.includes(
      liked_reviews: {film: {poster_attachment: :blob}},
      lists: {elements: {film: {poster_attachment: :blob}}},
      likes: {likeable: [:user,film: {poster_attachment: :blob}]},
      reviews: [{film: {poster_attachment: :blob}}, :likes]).with_attached_avatar.find_by(id: params[:id])
    @user_review_likes = Like.find(@user.reviews.joined_user_like.pluck("film_likes.id"))
    @liked_review_likes = Like.find(@user.liked_reviews.joined_user_like.pluck("film_likes.id"))
    if @user
      render :profile
    else
      render json: ["User not found"], status: 404
    end
  end

  def upload_avatar
    @user = User.find_by(params[:id])
    @user.avatar.attach(avatar_params)
  end

  private
  def user_params
    params.require(:user).permit(:username,:email,:password)
  end

  def avatar_params
    params.require(:avatar)
  end
end