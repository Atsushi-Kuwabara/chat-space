# DB設計

## users table
|Column|Type|Options|
|------|----|-------|
|name|string|index: true, null: false, unique: true|
|email|string|null: false, unique: true|

### Association
- has_many :groups, through: :members
- has_many :members
- has_many :messages

## groups table
|Column|Type|Options|
|------|----|-------|
|name|string|index: true, null: false|

### Association
- has_many :users, through: :members
- has_many :members
- has_many :messages

## members table
|Column|Type|Options|
|------|----|-------|
|user_id|references|foreign_key: true|
|group_id|references|foreign_key: true|

### Association
- belongs_to :user
- belongs_to :group

## messages table
|Column|Type|Options|
|------|----|-------|
|user_id|references|foreign_key: true|
|group_id|references|foreign_key: true|
|content|text||
|image|text||

### Association
- belongs_to :user
- belongs_to :group
