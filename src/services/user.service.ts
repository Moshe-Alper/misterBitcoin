import { Injectable } from "@angular/core";
import { BehaviorSubject, from, map, Observable, of, switchMap, tap, throwError } from "rxjs";
import { User } from "../app/models/user.modal";
import { utilService } from "./util.service";
import { storageService } from "./async-storage.service";
import { Contact } from "../app/models/contact.model";
import { Move } from "../app/models/move.model";


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
    public loggedInUser$ = this._loggedInUser$.asObservable();


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

    public addMove(contact: Contact, amount: number): Observable<any> {
        if (!amount) return of(null);
        
        const loggedInUser = { ...this.getLoggedInUser() };
        if (loggedInUser.coins < amount) return throwError(() => 'Not enough coins!');
        
        const newMove = this._createMove(contact, amount);
        loggedInUser.coins -= amount;
        loggedInUser.moves.unshift(newMove);
        
        return from(storageService.put(ENTITY, loggedInUser)).pipe(
            tap(() => this._saveLocalUser(loggedInUser))
        );
    }

    getLoggedInUser(): User {
        if (!this._loggedInUser$.value) {
            throw new Error('No logged-in user found')
        }
        return this._loggedInUser$.value
    }

    _createUser(name: string): Partial<User> {
        return {
            name,
            coins: 100,
            moves: []
        }
    }

    _createMove(contact: Contact, amount: number): Move {
        return {
            toId: contact._id,
            to: contact.name,
            at: Date.now(),
            amount
        }
    }

    _saveLocalUser(user: User | null) {
        this._loggedInUser$.next(user && { ...user });
        utilService.saveToSession(ENTITY_LOGGEDIN_USER, user)
    }

}