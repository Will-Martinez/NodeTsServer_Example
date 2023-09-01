
export class ObjHandler{
    public IsObjectNotEmpty(object: object): boolean {
        return Object.keys(object).length > 0 && Object.keys(object) != undefined;
    }

    public IsArrayNotEmpty(array: object): boolean {
        return Array.isArray(array) && array.length > 0;
    }
}