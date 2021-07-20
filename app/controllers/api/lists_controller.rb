class Api::ListsController < ApplicationController

  before_action :require_login, only: [:create, :add, :update, :destroy]

  def create
    if list_params.user_id == current_user.id
      @list = List.new(list_params)
      @list.is_watch_list = false
      if @list.save
        render :show
      else
        render json: @list.errors.full_messages, status: 422
      end
    else
      render json: ["Invalid permissions"], status: 403
    end
  end

  def show
    @list = List.includes(:user, elements: :film).find_by(id: params[:id])
    if @list
      render :show
    else
      render json: ["List not found"], status: 404
    end
  end

  def add
    if Integer(element_params[:userId]) == current_user.id
      list = List.find_by(id: element_params[:listId])
      @element = ListElement.create(film_id: element_params[:filmId], list_id: list.id, ord: num_elements + 1)
      if @element
        render :add
      else
        render json: @element.errors.full_messages, status: 422
      end
    else
      render json: ["Invalid permissions"], status: 403
    end
  end

  def update
    list_params = new_list_params
    if Integer(list_params[:userId] == current_user.id)
      list = List.find_by(id: params[:id])
      list.elements.destroy_all
      params[:list].each do |el|
        list_el = ListElement.new({film_id: el[:filmId], list_id: @list.id, ord: el[:ord]})
        if !list_el.save
          render list_el.errors.full_messages, status: 422
          failure = true
        end
      end
      if !failure
        @list = List.includes(:elements).find_by(id: params[:id])
        render :show
      end
    else
      render json: ["Invalid permissions"], status: 403
    end
  end

  def destroy
    @list = List.find_by(params[:list_id])
    if Integer(@list.user_id == current_user.id)
      if @list.destroy
        render json: {listId: @list.id}
      else
        render json: @list.errors.full_messages, status: 422
      end
    else
      render json: ["Invalid permissions"], status: 403
    end
  end

  private
  def element_params
    params.require(:element).permit(:filmId,:listId)
  end
  def new_list_params
    params.require(:list).permit(:userId,:title,:blurb,:ordered,elements: [:filmId,:ord])
  end
end
