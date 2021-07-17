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

  def show
    @user = User.includes(likes: :likeable, reviews: :film).with_attached_avatar.find_by(id: params[:id])
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