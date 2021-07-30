class Api::ListsController < ApplicationController

  before_action :require_login, only: [:create, :update, :destroy]

  def create
    if Integer(list_params[:userId]) == current_user.id
      @list = List.new(list_params.transform_keys(&:underscore))
      @list.is_watch_list = false
      if @list.save
        elements = (element_params[:elements] || [])
        elements.each do |el|
          new_el = ListElement.new(list_id: @list.id, film_id: el[1][:filmId], ord: @list.max_ord + 1 + Integer(el[0]))
          if !new_el.save
            return render new_el.errors.full_messages, status: 422
          end
        end
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
    @like = Like.find_by(likeable_type: "List", likeable_id: @list.id)
    if @list
      render :show
    else
      render json: ["List not found"], status: 404
    end
  end

  def get_watchlist
    @list = User.includes(watch_list: [:user, elements: {film: {poster_attachment: :blob, backdrop_attachment: :blob}}]).find_by(id: params[:user_id]).watch_list
    if @list
      render :show
    else
      render json: ["Could not find watchlist for given user ID"], status: 404
    end
  end

  def update
    if Integer(list_params[:userId]) == current_user.id
      list = List.find_by(id: params[:id])
      list.update(list_params.transform_keys(&:underscore))
      list.max_ord = 0
      if list.save 
        list.elements.destroy_all
        elements = (element_params[:elements] || [])
        elements.each do |el|
          new_el = ListElement.new(list_id: list.id, film_id: el[1][:filmId], ord:  list.max_ord + 1 + Integer(el[0]))
          if !new_el.save
            return render new_el.errors.full_messages, status: 422
          end
        end
        @list = List.includes(:elements).find_by(id: params[:id])
        render :show
      else
        render json: list.errors.full_messages, status: 422
      end
    else
      render json: ["Invalid permissions"], status: 403
    end
  end

  def destroy
    @list = List.find_by(id: params[:id])
    if Integer(@list.user_id) == current_user.id
      if @list.is_watch_list
        render json: ["Cannot manually destroy watch list"], status: 403
      else
        if @list.destroy
          render json: {listId: @list.id}
        else
          render json: @list.errors.full_messages, status: 422
        end
      end
    else
      render json: ["Invalid permissions"], status: 403
    end
  end

  private
  def list_params
    params.require(:list).permit(:userId,:title,:blurb,:ordered)
  end

  def element_params
    params.permit(elements: [:filmId])
  end
end
