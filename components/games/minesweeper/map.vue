<template>
    <div v-if="mapStatus.length > 0">
        <div class="flex flex-row justify-between">
            <span>time</span>
            <button @click="initMap()">{{ props.status }}</button>
            <span>boom</span>
        </div>
        <div v-for="(row, r) in map" :key="r" class="flex flex-row">
            <GamesMinesweeperTab
                v-for="(span, c) in row"
                :key="c"
                :class="
                    props.status == GameStatus.PLAYING ||
                    props.status == GameStatus.INIT
                        ? 'cursor-pointer'
                        : ''
                "
                @mousedown.left.prevent="mousedown(r, c)"
                @mouseup.left.prevent="hoverPoint = [-10, -10]"
                @click.left.stop="cellClick(r, c)"
                @click.right.prevent="flagCell(r, c)"
                :status="mapStatus[r][c]"
                :hover="
                    nmap(hoverPoint[0], hoverPoint[1]).some(
                        (arr) => arr.join('') == [r, c].join('')
                    )
                "
                :value="span"
            />

            <!-- :open="mapStatus[r][c] != MapStatus.Unknown"
                :flagged="mapStatus[r][c] === MapStatus.Flagged"
                :fail="mapStatus[r][c] === MapStatus.MarkedWrong"
                :hitMine="mapStatus[r][c] === MapStatus.HitMine" -->
            <!-- <div
                v-for="(span, c) in row"
                :key="c"
                class="w-[2.5rem] h-[2.5rem] flex items-center justify-center select-none"
                :class="
                    props.status == GameStatus.PLAYING ||
                    props.status == GameStatus.INIT
                        ? 'cursor-pointer'
                        : ''
                "
                @click.left="cellClick(r, c)"
                @click.right.prevent="signCell(r, c)"
            >
                {{ mapStatus[r][c] === 1 ? span : cellStatus[mapStatus[r][c]] }}
            </div> -->
        </div>
    </div>
</template>
<script setup lang="ts">
import { GameStatus, MapStatus, MineSweeperMap } from "~/@types/game";

interface Props {
    // map: MineSweeperMap[][];
    status?: GameStatus;
    config: MineSweeperConfig;
}
const cellStatus = [" ", "-", "@", "x", "💥"], // 未知、已知、标记、标记错误、踩雷
    hoverPoint = ref([-10, -10]),
    props = defineProps<Props>(),
    emits = defineEmits(["start", "pause", "win", "lose", "init"]),
    map = ref<MineSweeperMap[][]>([]),
    propConfig = computed(() => props.config);

const mapStatus = ref<MapStatus[][]>([]),
    nmap = computed(() => {
        return (x: number, y: number) => {
            let n = [];
            for (let i = -1; i < 2; i++) {
                for (let j = -1; j < 2; j++) {
                    if (i == 0 && j == 0) continue;
                    let m = [];
                    if (x) {
                        if (x + i < 0 || x + i >= map.value.length) continue;
                        m.push(x + i);
                    } else {
                        m.push(i);
                    }
                    if (y) {
                        if (y + j < 0 || x + i >= map.value[0].length) continue;
                        m.push(y + j);
                    } else {
                        m.push(j);
                    }
                    n.push(m);
                }
            }
            return n;
        };
    });

const mousedown = (x: number, y: number) => {
        if (mapStatus.value[x][y] != MapStatus.Known) return;
        // 获取周边雷的数量
        let mines = bombCount(x, y);
        // 找到了多少雷
        let minesFinded = 0;
        for (let i = -1; i < 2; i++) {
            for (let j = -1; j < 2; j++) {
                if (i == 0 && j == 0) continue;
                try {
                    if (mapStatus.value[x + i][y + j] == MapStatus.Flagged)
                        minesFinded++;
                } catch {}
            }
        }
        if (minesFinded == mines) {
            // 找到了足够数量的雷
            for (let i = -1; i < 2; i++) {
                for (let j = -1; j < 2; j++) {
                    if (i == 0 && j == 0) continue;
                    try {
                        if (mapStatus.value[x + i][y + j] == MapStatus.Unknown)
                            cellClick(x + i, y + j);
                    } catch {}
                }
            }
        } else {
            hoverPoint.value = [x, y];
        }
    },
    gameOver = () => {
        // 展示全部地雷
        for (let i = 0; i < map.value.length; i++) {
            for (let j = 0; j < map.value[i].length; j++) {
                if (map.value[i][j] === MineSweeperMap.BOMB) {
                    if (mapStatus.value[i][j] == MapStatus.Unknown)
                        mapStatus.value[i][j] = MapStatus.Known;
                }
            }
        }
        // 检查是否标记正确
        for (let i in mapStatus.value) {
            for (let j in mapStatus.value[i]) {
                if (
                    mapStatus.value[i][j] == MapStatus.Flagged &&
                    map.value[i][j] !== MineSweeperMap.BOMB
                ) {
                    // 标记错误
                    mapStatus.value[i][j] = MapStatus.MarkedWrong;
                }
            }
        }
        emits("lose");
    },
    flagCell = (x: number, y: number) => {
        if (props.status == GameStatus.INIT) emits("start");
        if (
            props.status !== GameStatus.PLAYING &&
            props.status !== GameStatus.INIT
        )
            return;
        if (mapStatus.value[x][y] == MapStatus.Known) return;
        mapStatus.value[x][y] =
            mapStatus.value[x][y] == MapStatus.Flagged
                ? MapStatus.Unknown
                : MapStatus.Flagged;
    },
    clickEmpty = (x: number, y: number) => {
        mapStatus.value[x][y] = MapStatus.Known;
        if (map.value[x][y] !== MineSweeperMap.EMPTY) {
            return;
        }
        for (let i = -1; i < 2; i++) {
            for (let j = -1; j < 2; j++) {
                if (i === 0 && j === 0) continue;
                if (
                    x + i >= 0 &&
                    x + i < map.value.length &&
                    y + j >= 0 &&
                    y + j < map.value[0].length &&
                    map.value[x + i][y + j] !== MineSweeperMap.BOMB &&
                    mapStatus.value[x + i][y + j] === MapStatus.Unknown
                )
                    clickEmpty(x + i, y + j);
            }
        }
    },
    cellClick = (x: number, y: number) => {
        if (props.status == GameStatus.INIT) {
            if (props.config.emptyFirst) initMap([x, y]);
            emits("start");
        }
        if (
            props.status !== GameStatus.PLAYING &&
            props.status !== GameStatus.INIT
        )
            return;

        if (mapStatus.value[x][y] == MapStatus.Flagged) {
            mapStatus.value[x][y] = MapStatus.Unknown;
            return;
        } else if (mapStatus.value[x][y] == MapStatus.Known) {
            return;
        }

        let cell = map.value[x][y];

        if (cell === MineSweeperMap.BOMB) {
            mapStatus.value[x][y] = MapStatus.HitMine;
            return gameOver();
        } else if (typeof cell == "number") {
            mapStatus.value[x][y] = MapStatus.Known;
        } else if (cell === MineSweeperMap.EMPTY) {
            clickEmpty(x, y);
        }
        // 判定是否结束
    },
    bombCount = (
        x: number,
        y: number,
        _map: MineSweeperMap[][] = map.value
    ) => {
        let count = 0;
        for (let i = -1; i <= 1; i++) {
            for (let j = -1; j <= 1; j++) {
                if (i === 0 && j === 0) continue;
                if (
                    x + i < 0 ||
                    x + i >= props.config.width ||
                    y + j < 0 ||
                    y + j >= props.config.height
                )
                    continue;

                if (_map[x + i][y + j] === MineSweeperMap.BOMB) count++;
            }
        }
        return count;
    },
    createMap = (pos?: number[]) => {
        let config = props.config;

        let _map = new Array(config.width);
        for (let i = 0; i < config.width; i++) {
            _map[i] = new Array(config.height).fill(MineSweeperMap.EMPTY);
        }

        // 随机生成地雷;
        for (let i = 0; i < config.mineCount; i++) {
            let x = Math.floor(Math.random() * config.width),
                y = Math.floor(Math.random() * config.height);

            while (
                _map[x][y] === MineSweeperMap.BOMB ||
                (pos && Math.abs(x - pos[0]) <= 1 && Math.abs(y - pos[1]) <= 1)
            ) {
                x = Math.floor(Math.random() * config.width);
                y = Math.floor(Math.random() * config.height);
            }

            _map[x][y] = MineSweeperMap.BOMB;
        }

        // 计算周围地雷数量
        for (let x = 0; x < config.width; x++) {
            for (let y = 0; y < config.height; y++) {
                if (_map[x][y] === MineSweeperMap.BOMB) continue;
                let count = bombCount(x, y, _map);
                if (count > 0) _map[x][y] = count;
            }
        }
        map.value = [];
        Object.assign(map.value, _map);
    },
    initMap = (pos?: number[]) => {
        emits("init");
        createMap(pos);

        mapStatus.value = new Array(map.value.length);
        for (let i = 0; i < map.value.length; i++) {
            mapStatus.value[i] = new Array(map.value[i].length).fill(
                MapStatus.Unknown
            );
        }
    };
watch(propConfig, () => initMap());
onNuxtReady(() => {
    initMap();
});
defineExpose({
    initMap,
});
</script>
