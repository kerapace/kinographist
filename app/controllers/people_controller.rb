class PeopleController < ApplicationController
  def show
    @person = People.find_by(id: params[:id])
  end
end