
export class ObjHandler{
    private local: string = "[OBJ-HANDLER]";

    public IsObjectNotEmpty(object: object): boolean {
        try {
            return Object.keys(object).length > 0 && Object.keys(object) != undefined;
        } catch(error) {
            console.error(`${this.local} Failed trying to verify object.`);
            throw error;
        }
    }
}