class Api::ReviewsController < ApplicationController
  before_action :require_login, only: [:update, :destroy]

  def update
    r = review_params.transform_keys(&:underscore).transform_values(&:presence)
    if Integer(r[:user_id]) == current_user.id
      @review = Review.find_by(user_id: r[:user_id],film_id: r[:film_id])
      @review ? @review.update(r) : @review = Review.new(r)
      if @review.save
        render :show
      else
        render json: @review.errors.full_messages, status: 422
      end
    else
      render json: ["Invalid user"], status: 403
    end
  end

  def show
    @review = Review.find_by(params[:id])
    if @review
      render :show
    else
      render json: ["Review not found"], status: 404
    end
  end

  def destroy
    @review = Review.find_by(id: params[:id])
    if @review
      if @review.user_id == current_user.id
        if @review.destroy
          render json: {}
        else
          render json: @review.errors.full_messages, status: 403
        end
      else
        render json: ["Invalid user"], status: 403
      end
    else
      render json: ["Review not found"], status: 404
    end
  end

  private
  def review_params
    params.require(:review).permit(:filmId,:userId,:rating,:watched,:title,:body)
  end
end