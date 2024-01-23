import mongoose, { Document, Schema } from 'mongoose';


export interface AuthType extends Document {
  username: string;
  email: string;
  password: string;
  resetPassword?: boolean;
  resetToken?: string | null;
  user: mongoose.Types.ObjectId;
}

const authSchema: Schema<AuthType> = new Schema(
  {
    username: {
      type: String,
      required: true,
      maxLength: 30,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    resetPassword: {
      type: Boolean,
      require: false,
      default: false,
    },
    resetToken: {
      type: String,
      require: false,
      default: null,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Users',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<AuthType>('auths', authSchema);
