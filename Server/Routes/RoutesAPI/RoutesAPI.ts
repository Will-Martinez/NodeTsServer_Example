import express from "express";
import { UserController } from "../../Controllers/UserController";
import { ResponseHandler } from "../../Helpers/ResponseHandler";
import { ObjHandler } from "../../Helpers/ObjectHandler";
import { ArrayHandler } from "../../Helpers/ArrayHandler";
const userController: UserController = new UserController();
const objHandler: ObjHandler = new ObjHandler();
const arrayHandler: ArrayHandler = new ArrayHandler();
const responseHandler: ResponseHandler = new ResponseHandler();

export class RoutesAPI {
    private local: string = "[ROUTES-API]";
    private router: express.Router = express.Router();

    private DefineAPIs(): void {
        this.router.post("/api/users/create", async (req: express.Request, res: express.Response) => {
            try {
                const validateBodyRequest: boolean = objHandler.IsObjectNotEmpty(req.body);
                if (validateBodyRequest == false) {
                    responseHandler.ReturnResponseMessage("Error", "Body request not defined", 404, res);
                } else {
                    await userController.CreateUser(req.body);
                    responseHandler.ReturnResponseMessage("Success", "User created.", 200, res);
                }
            } catch(error) {
                console.error(`${this.local} Internal server error: ${error}`);
                responseHandler.ReturnResponseMessage("Error", `Internal server error: ${error.message}`, 500, res);
            }
        });

        this.router.delete("/api/users/deleteUser/:id", async (req: express.Request, res: express.Response) => {
            try {
                const userID: string = req.params.id;
                if (!userID) {
                    console.error(`${this.local} User id not defined.`);
                    responseHandler.ReturnResponseMessage("Error", "User id not defined.", 404, res);
                } else {
                    responseHandler.ReturnResponseMessage("Sucess", `User with id ${userID} deleted.`, 200, res);
                }
            } catch(error) {
                responseHandler.ReturnResponseMessage("Error", `Internal server error: ${error.message}`, 500, res);
            }
        });

        this.router.get("/api/users/getUsers", async (req: express.Request, res: express.Response) => {
            try {
                const result: object = await userController.GetUsers();
                const IsArrayNotEmpty: boolean = arrayHandler.IsArrayNotEmpty(result);
                if (IsArrayNotEmpty == false) {
                    responseHandler.ReturnResponseMessage("Error", "Users not founded.", 404, res);
                } else {
                    responseHandler.ReturnResponseMessage("Succes", "Users founded", 200, res, result);
                }
            } catch(error) {
                console.error(`${this.local} Internal server error: ${error}`);
                responseHandler.ReturnResponseMessage("Error", `Internal server error: ${error.message}`, 500, res);
            }
        });

        this.router.get("/api/users/getUser/:id", async (req: express.Request, res: express.Response) => {
            try {
                const userID: string = req.params.id;
                if (!userID) {
                    console.info(`${this.local} User id not defined.`);
                    responseHandler.ReturnResponseMessage("Info", "User id not defined", 404, res);
                    return;
                }
                const result: object = await userController.GetUserByID(userID);
                const isObjectNotEmpty: boolean = objHandler.IsObjectNotEmpty(result);
                if (isObjectNotEmpty == false) {
                    responseHandler.ReturnResponseMessage("Error", "User not founded.", 404, res);
                } else {
                    responseHandler.ReturnResponseMessage("Success", "User founded", 200, res, result);
                }
            } catch (error) {
                console.error(`${this.local} Internal server error: ${error}`);
                responseHandler.ReturnResponseMessage("Error", `Internal server error: ${error.message}`, 500, res);
            }
        });
    }

    public MapRoutes(): express.Router {
        try {
            this.DefineAPIs();
            return this.router;
        } catch(error) {
            console.error(`${this.local} Failed trying to map routes: ${error}`);
            throw error;
        }
    }
}