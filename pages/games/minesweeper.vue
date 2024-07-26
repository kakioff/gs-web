<template>
    <div>
        <div class="contraller flex flex-row justify-between">
            <div class="flex flex-row gap-3">
                <GamesMinesweeperOptions v-model="gradeConfig" />
            </div>
            <div>
                <UButtonGroup>
                    <UButton @click="startGame">start</UButton>
                    <UButton
                        @click="gameStatus = GameStatus.PAUSE"
                        color="yellow"
                        >pause</UButton
                    >
                    <UButton color="red">stop</UButton>
                </UButtonGroup>
            </div>
        </div>
        <div class="flex flex-col justify-center items-center h-full">
            <!-- <div>banner-{{ gameStatus }}</div> -->
            <!-- <p>{{ gradeConfig }}</p> -->
            <GamesMinesweeperMap
                ref="mineMap"
                v-if="gradeConfig"
                :status="gameStatus"
                :config="gradeConfig"
                @start="gameStarted"
                @lose="gameOver(GameStatus.LOSE)"
                @win="gameOver(GameStatus.WIN)"
                @init="gameInit(GameStatus.INIT)"
            />
        </div>
    </div>
</template>
<script setup lang="ts">
import { GameStatus, MineSweeperMap } from "~/@types/game";

const gradeConfig = ref<MineSweeperConfig>(),
    gameStatus = ref<GameStatus>(GameStatus.INIT),
    mineMap = ref();

const gameOver = (status: GameStatus) => {
        gameStatus.value = status;
    },
    gameInit = (status = GameStatus.INIT) => {
        gameStatus.value = status;
    },
    gameStarted = (status = GameStatus.PLAYING) => {
        gameStatus.value = status;
    },
    startGame = () => {
        if (!gradeConfig.value) return;
        // map.value = createMap(gradeConfig.value);
        gameStarted(GameStatus.INIT);
        mineMap.value.initMap();
    };
</script>
