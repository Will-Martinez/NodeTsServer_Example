import express from "express";

export class ResponseHandler {
    private local: string = "[ERROR-HANDLER]";

    public ReturnResponseMessage(type: string, message: string, statusCode: number, res: express.Response, objectResut: object = null): express.Response {
        try {
            if (objectResut != null) {
                const obj: object = {
                    statusCode: statusCode,
                    message: message,
                    result: objectResut,
                    type: type,
                };
                return res.status(statusCode).send(obj);
            } else {
                const obj: object = {
                    statusCode: statusCode,
                    message: message,
                    type: type,
                };
                return res.status(statusCode).send(obj);
            }
        }catch(error) {
            console.error(`${this.local} Failed trying to return a ${type} message: ${error}`);
            throw error;
        }
    }
}