import mongoose, {Schema} from "mongoose";
import { IUser } from "../Interfaces/User";

const UserSchema: Schema = new Schema({
    name: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
        required: true,
    }
});

export const UserCollection = mongoose.model<IUser>("User", UserSchema);