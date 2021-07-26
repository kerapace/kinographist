Rails.application.routes.draw do
  root to: 'static_pages#root'

  namespace :api, defaults: { format: :json } do 
    resource :session, only: [:create, :destroy]
    resources :users, only: [:create, :show]
    resources :films, only: [:create, :update, :show]
    resources :likes, only: [:create, :index]
    resources :people, only: [:show]
    resources :reviews, only: [:show, :destroy]
    resources :lists, only: [:create, :show, :update, :destroy]
    resources :list_elements, only: [:create, :destroy]
    get 'films/by_tmdb_id/:tmdb_id', to: 'films#find_by_tmdb_id'
    get '/watchlist/:user_id', to: 'lists#get_watchlist'
    patch '/reviews', to: 'reviews#update'
    delete '/likes', to: 'likes#destroy'
    get '/browse', to: 'films#browse'
  end
end
