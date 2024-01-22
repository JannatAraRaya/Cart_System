import UserModel, { UserType } from "../model/user";
import IResponse from "../util/responseInterface";

class UserRepository {
    static async createUser(userData: UserType): Promise<IResponse> {
        try {
            const existingUser = await UserModel.findOne({
                $or: [{ email: userData.email }, { username: userData.username }],
            });

            if (existingUser) {
                return {
                    success: false,
                    message: "User with the same email or username already exists.",
                    error:"User with the same email or username already exists."
                };
            }

            const newUser = await UserModel.create(userData);

            return {
                success: true,
                data:newUser
            };

        } catch (error) {
            console.error(error);
            return {
                success: false,
                message:"Error creating new user..",
                error: error,
              };
        }
    }

}

export default UserRepository;
