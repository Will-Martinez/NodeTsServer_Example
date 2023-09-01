import { UserCollection } from "../Models/User";

export class UserController {
    private local: string = "[USER-CONTROLLER]";

    public async CreateUser(userData: object): Promise<object> {
        try {
            return await UserCollection.create(userData);
        } catch(error) {
            console.error(`${this.local} Failed trying to create a new user: ${error}`);
            throw error;
        }
    }

    public async DeleteUser(userID: string): Promise<object> {
        try {
            if(!userID) {
                console.error(`${this.local} User id not defined.`);
                throw new Error("User id not defined.");
            }
            return await UserCollection.findByIdAndDelete(userID);
        } catch (error) {
            console.error(`${this.local} Failed trying to delete user by id: ${error}`);
            throw error;
        }
    }

    public async GetUsers(): Promise<Object> {
        try {
            return await UserCollection.find({});
        } catch (error) {
            console.error(`${this.local} Failed trying to get users: ${error}`);
            throw error;
        }
    }

    public async GetUserByID(userID: string): Promise<object> {
        try {
            return await UserCollection.findById(userID);
        } catch (error) {
            console.error(`${this.local} Failed trying to find user.`);
            throw error;
        }
    }
}