const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const { Schema } = mongoose;

const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        'Please add a valid email',
      ],
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: 6,
    },
  },
  { timestamps: true },
);

// 비밀번호 암호화
UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// 가상 필드 추가
UserSchema.virtual('id').get(function () {
  return this._id.toHexString();
});

// JSON 직렬화 시 숨길 필드 설정
UserSchema.set('toJSON', {
  virtuals: true,
  transform: (doc, ret) => {
    delete ret._id; // `_id` 제거
    delete ret.__v; // `__v` 제거
    delete ret.password; // 비밀번호 숨김
  },
});

module.exports = mongoose.model('User', UserSchema);
