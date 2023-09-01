
export class ArrayHandler{

    public IsArrayNotEmpty(array: object): boolean {
        return Array.isArray(array) && array.length > 0;
    }
}