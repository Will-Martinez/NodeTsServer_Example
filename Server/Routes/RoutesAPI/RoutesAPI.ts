import express from "express";
import { UserController } from "../../Controllers/UserController";
import { ResponseHandler } from "../../Helpers/ResponseHandler";
import { ObjHandler } from "../../Helpers/ObjectHandler";
const userController: UserController = new UserController();
const objHandler: ObjHandler = new ObjHandler();
const responseHandler: ResponseHandler = new ResponseHandler();

export class RoutesAPI {
    private local: string = "[ROUTES-API]";
    private router: express.Router = express.Router();

    private DefineAPIs(): void {
        this.router.post("/api/users/create", async (req: express.Request, res: express.Response) => {
            try {
                await userController.CreateUser(req.body, res);
            } catch (error) {
                console.error(`${this.local} Internal server error: ${error}`);
                responseHandler.ReturnResponseMessage("Error", `${error.message}`, 500, res);
            }
        });

        this.router.delete("/api/users/deleteUser/:id", async (req: express.Request, res: express.Response) => {
            try {
                await userController.DeleteUser(req.params.id, res);
            } catch(error) {
                console.error(`${this.local} Internal server error: ${error}`);
                responseHandler.ReturnResponseMessage("Error", `${error.message}`, 500, res);
            }
        });

        this.router.get("/api/users/getUsers", async (req: express.Request, res: express.Response) => {
            try {
                await userController.GetUsers(res);
            } catch(error) {
                console.error(`${this.local} Internal server error: ${error}`);
                responseHandler.ReturnResponseMessage("Error", `Internal server error: ${error.message}`, 500, res);
            }
        });

        this.router.get("/api/users/getUser/:id", async (req: express.Request, res: express.Response) => {
            try {
                await userController.GetUserByID(req.params.id, res);
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