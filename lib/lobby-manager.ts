import type User from "../models/user"
import { getRelics, getPrimes } from "./relic-utils"

export const LobbyManager = {
    lobbies: new Map<string, User[]>(),
    availableLobbies() {
        return this.lobbies.keys()
    },
    getLobby(relicName: string, refinement: string) {
        const lobby = this.lobbies.get(relicName + refinement)
        if (lobby)
            return lobby
        throw new Error("That room does not exist!")
    },
    joinLobby(user: User, relicName: string, refinement: string) {
        const lobby = this.getLobby(relicName, refinement)
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

getRelics().forEach(relic => {
    LobbyManager.lobbies.set(relic.name, [])
})

Object.keys(getPrimes()).forEach(prime => LobbyManager.lobbies.set(prime, []))
