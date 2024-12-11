import { relicToString } from "../models/relic";
import type User from "../models/user";
import { getRelics } from "./relic-utils";

export const LobbyManager = {
    lobbies: new Map<string, User[]>(),
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
    LobbyManager.lobbies.set(relicToString(relic), [])
})
