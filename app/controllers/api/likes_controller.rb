class Api::LikesController < ApplicationController
  
  before_action :require_login

  def create
    like_class = like_class(params[:type])
    if !like_class
      render json: ["Invalid class type"], status: 422
    else
      user = User.find_by(id: params[:userId])
      likeable = like_class.find_by(id: params[:likeableId])
      if user && likeable && user.id == current_user.id
        @like = Like.create(user_id: user.id, likeable: likeable)
        if @like.save
          render :show
        else
          render json: @like.errors.full_messages, status: 422
        end
      elsif !user
        render json: ["User not found"], status: 404
      elsif user.id != current_user.id
        render json: ["Invalid user"], status: 403
      else 
        render json: ["#{LikeClass} not found"], status: 404
      end
    end
  end

  def destroy
    @like = Like.find_by(
      user_id: params[:userId],
      likeable_type: params[:type].capitalize,
      likeable_id: params[:likeableId]
    )
    if @like
      if @like.user_id == current_user.id
        if @like.destroy
          render :show
        else
          render json: @like.errors.full_messages, status: 422
        end
      else
        render json: ["Invalid user"], status: 403
      end
    else
      render json: ["Like not found"], status: 404
    end
  end

  private
  def like_class(type)
    case type
    when "Review"
      Review
    when "Film"
      Film
    end
  end
end
