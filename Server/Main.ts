import { ServerConfig } from "./Config/ServerConfig";

class Main {
    
    private local: string = "[MAIN]";
    public RunServer(): void {
        const port: number = 3000;
        try {
            const server: ServerConfig = new ServerConfig(port);
            server.StartServer();
        } catch (error) {
            console.error(`${this.local} Error: ${error}`);
            throw error;
        }
    }
}

const serverCore = new Main();
serverCore.RunServer();