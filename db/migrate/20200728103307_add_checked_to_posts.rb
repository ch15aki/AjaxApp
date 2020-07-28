class AddCheckedToPosts < ActiveRecord::Migration[6.0]
  def change
    add_column :posts, :checked, :boolean
  end
end
