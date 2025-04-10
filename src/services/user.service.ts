import { Injectable } from "@angular/core";
import { BehaviorSubject, from, map, of, switchMap, tap } from "rxjs";
import { User } from "../app/models/user.modal";
import { utilService } from "./util.service";
import { storageService } from "./async-storage.service";


const ENTITY = 'user'
const ENTITY_LOGGEDIN_USER = 'loggedinUser'
@Injectable({
    providedIn: 'root'
})

export class UserService {

    constructor() {
        const users = JSON.parse(localStorage.getItem(ENTITY)!)
        if (!users || users.length === 0) {
            localStorage.setItem(ENTITY, JSON.stringify([]))
        }
    }

    private _loggedInUser$ = new BehaviorSubject<User | null>(utilService.loadFromSession(ENTITY_LOGGEDIN_USER));
    public loggedInUser$ = this._loggedInUser$.asObservable()


    public signup(name: string) {
        return from(storageService.query<User>(ENTITY)).pipe(
            map(users => users.find(_user => _user.name === name)),
            switchMap(user => user
                ? of(user)
                : from(storageService.post(ENTITY, this._createUser(name) as User))
            ),
            tap(user => this._saveLocalUser(user))
        )
    }

    public logout() {
        return of(null).pipe(
            tap(() => this._saveLocalUser(null))
        )
    }

    getLoggedInUser(): User | null {
        return this._loggedInUser$.value
    }

    _createUser(name: string): Partial<User> {
        return {
            name,
            coins: 100,
            moves: []
        }
    }
    _saveLocalUser(user: User | null) {
        this._loggedInUser$.next(user && { ...user });
        utilService.saveToSession(ENTITY_LOGGEDIN_USER, user)
    }
}