import { STORAGE_KEYS } from '../config/storage_keys.config';
import { LocalUser } from '../shared/local_user.model';

export class StorageService{
    constructor(){ }

    public getLocalUser(): LocalUser {
        let user = localStorage.getItem(STORAGE_KEYS.localUser)
        if (user == null){
            return null
        }
        else{
            return JSON.parse(user)
        }
    }

    public setLocalUser(user: LocalUser): void {
        if (user == null){
            localStorage.removeItem(STORAGE_KEYS.localUser)
        }
        else{
            localStorage.setItem(STORAGE_KEYS.localUser, JSON.stringify(user))
        }
    }

    public isUserLogged(): boolean {
        let localUser = this.getLocalUser()
        if (localUser && localUser.email) {
            return true
        }
        else {
            this.setLocalUser(null)
            return false
        }
    }
}