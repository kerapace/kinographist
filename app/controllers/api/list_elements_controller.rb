class Api::ListElementsController < ApplicationController
  before_action :require_login

  def create
    if Integer(element_params[:userId]) == current_user.id
      @list = List.find_by(id: element_params[:listId])
      if @list
        @element = ListElement.new(film_id: element_params[:filmId], list_id: @list.id, ord: (@list.max_ord || 0) + 1)
        if @element.save
          render :show
        else
          render json: @element.errors.full_messages, status: 422
        end
      else
        render json: ["List not found"], status: 404
      end
    else
      render json: ["Invalid permissions"], status: 403
    end
  end

  def destroy
    @element = ListElement.find_by(id: params[:id])
    @list = List.find_by(id: @element.list_id)
    if current_user.id == @element.list.user_id
      if @element.destroy
        render :show
      else
        render json: @element.errors.full_messages, status: 422
      end
    else
      render json: ["Invalid permissions"], status: 403
    end
  end

  private
  def element_params
    params.require(:element).permit(:filmId,:listId,:userId)
  end
end