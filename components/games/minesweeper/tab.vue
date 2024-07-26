<template>
    <div class="tab">
        <img
            v-if="props.hover && props.status == MapStatus.Unknown"
            :src="gfb[0]"
        />
        <img v-if="props.status == MapStatus.Flagged" :src="gfs[1]" />
        <img v-if="props.status == MapStatus.HitMine" :src="gfs[2]" />
        <img v-else-if="props.status == MapStatus.Unknown" :src="gfs[0]" />
        <img
            v-else-if="
                typeof props.value == 'number' &&
                props.status != MapStatus.MarkedWrong
            "
            :src="gfb[props.value]"
        />
        <img v-else-if="props.value === MineSweeperMap.EMPTY" :src="gfb[0]" />
        <img v-else-if="props.value === MineSweeperMap.BOMB" :src="gfs[3]" />
        <div
            v-if="
                typeof props.value === 'number' &&
                props.status == MapStatus.MarkedWrong
            "
            class="sign-fail"
        >
            <img :src="gfb[props.value]" @load="startToggleSign" />
            <img v-if="showSign" :src="gfs[1]" />
        </div>
        <!-- <span class="absolute text-black z-10 top-0">{{ props.hover?'1':'0' }}</span> -->
    </div>
</template>
<script setup lang="ts">
import { MapStatus, MineSweeperMap } from "~/@types/game";
import { gfs, gfb } from "~/components/games/minesweeper";
interface Props {
    // open: boolean;
    value: MineSweeperMap;
    // flagged: boolean;
    // fail: boolean;
    hover: boolean;
    status: MapStatus;
}
const props = withDefaults(defineProps<Props>(), {
    value: MineSweeperMap.EMPTY,
});

let showSign = ref(true),
    si: any = null,
    startToggleSign = () => {
        if (si) clearInterval(si);
        si = setInterval(() => {
            showSign.value = !showSign.value;
        }, 1000);
    };
</script>
<style lang="scss" scoped>
.tab {
    position: relative;
    width: 40px;
    height: 40px;
}
img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}
@keyframes wiggle {
    0% {
        opacity: 100;
    }
    50% {
        opacity: 0;
    }
    100% {
        opacity: 100;
    }
}
.sign-fail {
    @apply relative w-full h-full;
    img {
        @apply absolute left-0 top-0 h-full w-full;
        // &:last-child {
        //     animation: wiggle 2s infinite;
        // }
    }
}
</style>
