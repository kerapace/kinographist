require 'uri'
require 'net/http'

class Api::FilmsController < ApplicationController
  def create
    @film = Film.populate_film!(params[:tmdbId])
    if @film.save
      render :show
    else
      render json: @film.errors.full_messages, status: 422
    end
  end

  # def update
  #   @film = Film.find_by(id: params[:id])
  #   response = request_film(@film.tmdb_id)
  #   film_data = extract_film_data(response)
  #   if @film.update(film_data)
  #     render :show
  #   else
  #     render json: @film.errors.full_messages, status: 422
  #   end
  # end

  def browse
    @films = Film::reduce_constraints(*search_params.to_h.to_a).with_attached_poster
  end

  def show
    @user = current_user
    @film = Film.includes(:contributions, :crewmembers, :list_appearances, lists: [:elements], reviews: [:user]).find_by(id: params[:id])
    if @film
      if @user
        @user_list_appearances = @film.list_appearances.merge(@user.list_elements)
      end
      @review_film_likes = Like.find(Review.joined_user_like.merge(@film.reviews).pluck("film_likes.id"))
      @backdrop = url_for(@film.backdrop)
      @poster = url_for(@film.poster)
      render :show
    else
      render json: ["Film not found"], status: 404
    end
  end

  def find_by_tmdb_id
    @user = current_user
    @film = Film.with_attached_poster.with_attached_backdrop.find_by(tmdb_id: params[:tmdb_id])
    if @film
      render :light_data
    else
      render json: ["Film not found"], status: 404
    end
  end

  private
  def search_params
    params.require("filter").permit! if params["filter"].present?
  end
end