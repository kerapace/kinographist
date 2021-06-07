require 'uri'
require 'net/http'

class Api::FilmsController < ApplicationController
  def create
    @film = populate_film!(params[:tmdbId])
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

  def show
    @film = Film.includes(:contributions,:crewmembers).find_by(id: params[:id])
    @backdrop = url_for(@film.backdrop)
    @poster = url_for(@film.poster)
  end
end