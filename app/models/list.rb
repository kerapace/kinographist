class List < ApplicationRecord
  belongs_to :user
  has_many :elements, class_name: :ListElement
  
end
