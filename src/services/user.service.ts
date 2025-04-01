import { Injectable } from '@angular/core'
import { Observable, from } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class UserService {

    public getUser(): Observable<any[]> {
        return from([this._createUser()])
    }

    private _createUser() {
        const users = [
            {
                name: "Ochoa Hyde",
                coins: 100,
                moves: []
            }
        ]
        
        return users
    }
}