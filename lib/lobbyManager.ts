import { relicToString } from "../models/relic";
import type User from "../models/user";
import { getRelics } from "./relics";

export const LobbyManager = {
    lobbies: new Map<string, User[]>(),
    getLobby(relicname: string, refinement: string) {
        const lobby = this.lobbies.get(relicname + refinement)
        if (lobby)
            return lobby
        throw new Error("That room does not exist!")
    },
    joinLobby(user: User, relicname: string, refinement: string) {
        const lobby = this.getLobby(relicname, refinement)
        if (lobby.length < 4) {
            if (!lobby.some(e => e.name === user.name)) {
                lobby.push(user)
                return lobby
            }
            throw new Error("That user is already in the lobby!")
        }
        throw new Error("That room is full!")
    }
}

getRelics().then(res => {
    res.relics.forEach(relic => {
        LobbyManager.lobbies.set(relicToString(relic), [])
    })
})

