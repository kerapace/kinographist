class RemovePresenceRequirementFromOrd < ActiveRecord::Migration[5.2]
  def change
    change_column_null :film_crews, :ord, true
  end
end
