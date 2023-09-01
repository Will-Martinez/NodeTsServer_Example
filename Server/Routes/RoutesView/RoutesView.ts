import express from "express";
import { ResponseHandler } from "../../Helpers/ResponseHandler";
const responseHandler: ResponseHandler = new ResponseHandler();

export class RoutesView {
    private local: string = "[ROUTES-VIEW]";
    private router: express.Router = express.Router();

    private DefineRoutes(): void {
        this.router.get("/", (req: express.Request, res: express.Response) => {
            try {
                res.redirect("/home");
            } catch (error) {
                console.error(`${this.local} Internal server error: ${error}`);
                responseHandler.ReturnResponseMessage("Error", `Internal server error: ${error.message}`, 500, res);
            }
        });

        this.router.get("/home", (req: express.Request, res: express.Response) => {
            try {
                res.status(200).sendFile("home.html", { root: "./Client/Public/Views" });
            } catch (error) {
                console.error(`${this.local} Internal server error: ${error}`);
                responseHandler.ReturnResponseMessage("Error", `Internal server error: ${error.message}`, 500, res);
            }
        });
    }

    public MapRoutes(): express.Router {
        try {
            this.DefineRoutes();
            return this.router;
        } catch (error) {
            console.error(`${this.local} Failed trying to map routes: ${error}`);
            throw error.message
        }
    }
}