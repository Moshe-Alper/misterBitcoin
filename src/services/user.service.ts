export class UserService {

    public getUser() {
        return this._createUsers
    }

    private _createUsers() {
        const user = [
            {
                name: "Ochoa Hyde",
                coins: 100,
                moves: []
            },
            {
                name: "Hallie Mclean",
                coins: 150,
                moves: []
            },
            {
                name: "Parsons Norris",
                coins: 200,
                moves: []
            },
            {
                name: "Greer Shepard",
                coins: 250,
                moves: []
            },
            {
                name: "Cote Becker",
                coins: 300,
                moves: []
            },
            {
                name: "Maddox Palmer",
                coins: 350,
                moves: []
            }
        ]
    }
}
