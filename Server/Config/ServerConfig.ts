import express from "express";
import { RoutesView } from "../Routes/RoutesView/RoutesView";
import { RoutesAPI } from "../Routes/RoutesAPI/RoutesAPI";
import { MongoConnection } from "./MongoConnection";

const routesView: RoutesView = new RoutesView();
const routesAPI: RoutesAPI = new RoutesAPI();
const mongoClient: MongoConnection = new MongoConnection();
export class ServerConfig {
    private port: number;
    private local = "[SERVER-CONFIG]";
    private server = express();

    constructor(port: number) {
        this.port = port;
    }

    private async ConnectDatabase(): Promise<void> {
        try {
            await mongoClient.StartConnection();
        } catch (error) {
            console.error(`${this.local} Error: ${error}`);
            throw error.message;
        }
    }

    private DefineMiddlewares(): void {
        try {
            this.server.use(express.json());
            this.server.use(routesView.MapRoutes());
            this.server.use(routesAPI.MapRoutes());
        } catch (error) {
            console.error(`${this.local} Failed trying to define middlewares: ${error}`);
            throw error.message
        }
    }

    public async StartServer(): Promise<void> {
        try {
            await this.ConnectDatabase();
            this.DefineMiddlewares();
            this.server.listen(this.port, () => {
                console.log(`${this.local} Runing on port ${this.port}`);
            });
        } catch (error) {
            console.error(`${this.local} Failed trying to start server: ${error}`);
            throw error.message;
        }
    }
}