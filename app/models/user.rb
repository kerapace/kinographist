class User < ApplicationRecord

  validates :username, :email, presence: true, uniqueness: true
  validates :session_token, :password_digest, presence: true
  validates :password, length: {minimum: 6, allow_nil: true}

  attr_reader :password

  before_validation :ensure_session_token

  def self.find_by_credentials(username,password)
    user = User.find_by(username: username)
    user && user.is_password?(password) ? user : nil
  end

  def password=(pw)
    @password = pw
    self.password_digest = BCrypt::Password.create(pw)
  end

  def is_password?(password)
    pw_object = BCrypt::Password.new(self.password_digest)
    pw_object.is_password?(password)
  end

  def reset_session_token!
    self.session_token = SecureRandom::urlsafe_base64
    self.save!
    self.session_token
  end

  def ensure_session_token
    self.session_token ||= SecureRandom::urlsafe_base64
  end
end