class Api::SessionsController < ApplicationController
  def create
    @user = User.find_by_credentials(params[:user][:username],params[:user][:password])
    if @user
      login!(@user)
      render 'api/users/show'
    else
      render json: ['Invalid username/password combination'], status: 422
    end
  end

  def destroy
    if current_user
      logout!
      render json: {}
    else
      render json: ['User session not found'], status: 404
    end
  end
end
