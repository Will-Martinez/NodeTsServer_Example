import mongoose from "mongoose";

export class MongoConnection{
    private uri: string = "mongodb://localhost/NodeTsServer";
    private local: string = "[MONGO-CONNECTION]";

    private async DatabaseConnection(): Promise<void> {
        try {
            mongoose.Promise = global.Promise;
            await mongoose.connect(this.uri);
            console.log(`${this.local} Connected.`);
        }catch(error) {
            console.error(`${this.local} Failed trying to connect database: ${error}`);
            throw error.message;
        }
    }

    public async StartConnecetion(): Promise<void> {
        try {
            await this.DatabaseConnection();
        } catch (error) {
            console.error(`${this.local} Error: ${error}`);
            throw error.message;
        }
    }
}