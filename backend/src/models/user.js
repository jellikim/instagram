import mongoose, { Schema } from 'mongoose';
import bcrypt from 'bcrypt'; //단방향 해싱 함수를 지원해주는 라이브러리
import jwt from 'jsonwebtoken';

//스키마 작성
const UserSchema = new Schema({
  username: String,
  uname: String,
  hashedPassword: String,
});

//인스턴스 메서드 -> 비밀번호를 파라미터로 받아서 계정의 hashedPassword 값을 설정
UserSchema.methods.setPassword = async function (password) {
  const hash = await bcrypt.hash(password, 10);
  this.hashedPassword = hash;
};

//인스턴스 메서드 -> 파라미터로 받은 비밀번호가 해당 계정의 비밀번호와 일치하는지 검증
UserSchema.methods.checkPassword = async function (password) {
  const result = await bcrypt.compare(password, this.hashedPassword);
  return result; // true / false
};

//스태틱 메서드 ->username으로 데이터 찾음
UserSchema.statics.findByUsername = function (username) {
  return this.findOne({ username });
};

UserSchema.methods.serialize = function () {
  const data = this.toJSON();
  delete data.hashedPassword;
  return data;
};

//인스턴스 메서드
UserSchema.methods.generateToken = function () {
  const token = jwt.sign(
    // 첫 번째 파라미터에는 토큰 안에 집어넣고 싶은 데이터를 넣습니다.
    {
      _id: this.id,
      username: this.username,
    },
    process.env.JWT_SECRET, // 두 번째 파라미터에는 JWT 암호를 넣습니다.
    {
      expiresIn: '7d', //7일 동안 유효함
    },
  );
  return token;
};

const User = mongoose.model('User', UserSchema);
export default User;
