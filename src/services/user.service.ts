import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { User } from "../app/models/user.modal";

@Injectable({
    providedIn: 'root'
})
export class UserService {

    private user: User = {
        name: "John Carlos",
        coins: 100,
        moves: []
    }

    private _loggedInUser$ = new BehaviorSubject<User>(this.user)
    public loggedInUser$ = this._loggedInUser$.asObservable()


    getUser(): User {
        return this.user
    }

    addCoins = (coins: number) => {
        const user = this._loggedInUser$.value
        this._loggedInUser$.next({ ...user, coins: user.coins + coins })
    }
}