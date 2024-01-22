import mongoose, { Document, Schema } from "mongoose";

export interface UserType {
    username: string;
    email:string,    
    password: string;
    // resetToken?: string;
    // resetTokenExpiration?: number;
    isAdmin?: boolean;
    gender?: string;
    // cart: mongoose.Schema.Types.ObjectId[];
}

export interface UserDocument extends UserType, Document { }

const userSchema: Schema = new Schema<UserType>(

  {  
    username:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
    isAdmin:{
        type:Boolean,
        default:false
    },
    gender:{
        type:String,

    }
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<UserType>("Users", userSchema);
