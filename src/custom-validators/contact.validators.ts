import { AbstractControl } from "@angular/forms"
import { map, timer } from "rxjs"


export function onlyEnglishLetters(control: AbstractControl) {
    const isEnglishLetters = (/^[a-zA-Z ]*$/ig).test(control.value)
    return !isEnglishLetters ? { onlyEnglishLetters: 'Only english letters are allowed!' } : null
}

export function nameTaken(control: AbstractControl) {
    return timer(1000).pipe(map(() => {
        if (control.value === 'popo') return {nameTaken: 'Name is already taken!'}
        return null
    }))

}
