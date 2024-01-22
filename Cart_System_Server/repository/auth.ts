import UserModel, { UserType } from "../model/user";

class AuthRepository {
    static async findUserByEmail(email: string): Promise<UserType | null> {
        return UserModel.findOne({ email });
    }
}

export default AuthRepository;
