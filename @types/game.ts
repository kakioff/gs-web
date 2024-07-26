export enum MineSweeperMap {
    number = 0,
    BOMB = "*",
    EMPTY = "0",
}
export enum GameStatus {
    INIT = "init",
    PLAYING = "playing",
    PAUSE = "pause",
    WIN = "win",
    LOSE = "lose",
}

export enum MapStatus {
    Unknown = " ",
    Known = "-",
    Flagged = "@",
    MarkedWrong = "x",
    HitMine = "💥",
}