Rails.application.routes.draw do
  root to: 'static_pages#root'

  namespace :api, defaults: { format: :json } do 
    resource :session, only: [:create, :destroy]
    resources :users, only: [:create]
    resources :films, only: [:create, :update, :show]
    resources :people, only: [:show]
    resources :reviews, only: [:create, :update, :show, :destroy]
    get '/browse', to: 'films#browse'
  end
end
