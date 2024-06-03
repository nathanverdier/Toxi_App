export class Personne {
    private _id : string
    private _name : string
    private _image : string


    constructor(id : string, name : string, image : string) {
        this._id = id
        this._name = name
        this._image = image
    }

    public getId() : string {
        return this._id
    }

    public getName() : string {
        return this._name
    }

    public getImage() : string {
        return this._image
    }
}