import express from "express";
import { ResponseHandler } from "../Helpers/ResponseHandler";
import { UserCollection } from "../Models/User";
import { IUser } from "../Interfaces/User";
import { ObjHandler } from "../Helpers/ObjectHandler";
const objHandler: ObjHandler = new ObjHandler();
const responseHandler: ResponseHandler = new ResponseHandler();
export class UserController {
    private local: string = "[USER-CONTROLLER]";

    public async CreateUser(userData: IUser, response: express.Response): Promise<object> {
        try {
            
            const userDataIsObject: boolean = objHandler.IsObjectNotEmpty(userData);
            if (userDataIsObject == false) {
                return responseHandler.ReturnResponseMessage("Error", "User data is not a valid object.", 400, response);
            }

            const result: object = await UserCollection.create(userData);
            return responseHandler.ReturnResponseMessage("Success", "User created.", 200, response, result);
        } catch(error) {
            throw error;
        }
    }

    public async DeleteUser(userID: string, response: express.Response): Promise<object> {
        try {
            if(!userID) {
                return responseHandler.ReturnResponseMessage("Error", "User id not defined", 400, response);
            }
            const result: object | undefined | null = await UserCollection.findByIdAndDelete(userID);

            if (result == undefined || result == null) {
                return responseHandler.ReturnResponseMessage("Info", "User id not founded", 404, response);
            }

            const isResultValid: boolean = objHandler.IsObjectNotEmpty(result);
            if (isResultValid == false) {
                return responseHandler.ReturnResponseMessage("Error", "Failed trying to get user infos.", 400, response);
            }
            return responseHandler.ReturnResponseMessage("Success", "User deleted.", 200, response, result);
        } catch (error) {
            throw error;
        }
    }

    public async GetUsers(response: express.Response): Promise<object> {
        try {
            const result: object[] = await UserCollection.find({});
            const isResultArray: boolean = objHandler.IsArrayNotEmpty(result);
            if (isResultArray == false) {
                return responseHandler.ReturnResponseMessage("Info", "Users not founded.", 404, response);
            }
            return responseHandler.ReturnResponseMessage("Success", "Users founded.", 200, response, result);
        } catch (error) {
            throw error;
        }
    }

    public async GetUserByID(userID: string, response: express.Response): Promise<object> {
        try {
            if (!userID) {
                return responseHandler.ReturnResponseMessage("Error", "User id not defined.", 400, response);
            }

            const result: object | null | undefined = await UserCollection.findById(userID)
            if (result == null || result == undefined) {
                return responseHandler.ReturnResponseMessage("Info", "User not founded.", 404, response);
            }

            const isResultValid: boolean = objHandler.IsObjectNotEmpty(result);
            if (isResultValid == false) {
                return responseHandler.ReturnResponseMessage("Error", "Failed trying to get user infos.", 400, response);
            }
            return responseHandler.ReturnResponseMessage("Success", "User founded.", 200, response, result);
        } catch (error) {
            throw error;
        }
    }
}