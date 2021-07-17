Rails.application.routes.draw do
  root to: 'static_pages#root'

  namespace :api, defaults: { format: :json } do 
    resource :session, only: [:create, :destroy]
    resources :users, only: [:create, :show]
    resources :films, only: [:create, :update, :show]
    resources :likes, only: [:create, :index]
    resources :people, only: [:show]
    resources :reviews, only: [:create, :update, :show, :destroy]
    delete '/likes', to: 'likes#destroy'
    get '/browse', to: 'films#browse'
  end
end
