import { Injectable } from '@angular/core'
import { Observable, from } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class UserService {

    public getUser(): Observable<any[]> {
        return from([this._createUsers()])
    }

    private _createUsers() {
        const users = [
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
        
        return users
    }
}