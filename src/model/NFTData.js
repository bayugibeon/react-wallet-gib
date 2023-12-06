export default class NFT {
    id = 0;
    name = "";
    description = "";
    balance = 0;
    image = "";

    constructor(_id, _name, _description, _image, _balance) {
        this.id = _id;
        this.name = _name;
        this.description = _description;
        this.balance = _balance;
    }
}