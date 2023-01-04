<script lang="ts">
import SVGA from "svgaplayerweb";
import { onMounted, ref, watch, defineEmits } from "vue";
interface svgaProps {
  width?: string;
  height?: string;
  src: string;
  loops?: number;
  clearsAfterStop?: boolean;
  fillMode?: "Forward" | "Backward";
  autoplay?: boolean;
  stretch?: boolean;
}
const animationStore: { [path: string]: Promise<SVGA.VideoEntity> } = {};
export const load = (path: string) => {
  if (!animationStore[path]) {
    animationStore[path] = new Promise((resolve, reject) => {
      const parser = new SVGA.Parser();
      parser.load(path, resolve, reject);
    });
  }
  return animationStore[path];
};
function initAni(
  player: SVGA.Player,
  options: svgaProps,
  cb: (eventName?: string, eventDetail?: unknown) => void = () => void 0
) {
  const path = options.src;
  load(path).then((videoItem) => {
    player.setVideoItem(videoItem);
    player.loops = options.loops || 0;
    player.clearsAfterStop = options.clearsAfterStop || true;
    player.fillMode = options.fillMode || "Forward";
    player.clear();
    if (options.autoplay) {
      player.startAnimation();
    }
    cb("init");
    player.onFinished(() => {
      cb("Finished");
    });
    player.onFrame((frame) => {
      cb("Frame", frame);
    });
    player.onPercentage((percentage) => {
      cb("Percentage", percentage);
    });
  });
}
export const playAni = (
  el: HTMLDivElement | HTMLCanvasElement,
  srcOrOptions: svgaProps | string,
  eventCallBack?: (eventName?: string, eventDetail?: unknown) => void
) => {
  let player = new SVGA.Player(el);
  let option: svgaProps = {
    src: "",
    autoplay: true,
    loops: 1,
  };
  if (typeof srcOrOptions == "string") {
    option.src = srcOrOptions;
  } else {
    Object.keys(srcOrOptions).forEach((k) => {
      (option as any)[k] = (srcOrOptions as any)[k];
    });
  }
  initAni(player, option, eventCallBack);
  return player;
};
</script>
<script lang="ts" setup>
interface svgaProps {
  width?: string;
  height?: string;
  src: string;
  loops?: number;
  clearsAfterStop?: boolean;
  fillMode?: "Forward" | "Backward";
  autoplay?: boolean;
  stretch?: boolean;
}
const props = withDefaults(defineProps<svgaProps>(), {
  width: "auto",
  height: "auto",
  loops: 0,
  clearsAfterStop: true,
  autoplay: true,
  fillMode: "Forward",
  stretch: false,
});
const emit = defineEmits(["init", "Finished", "Frame", "Percentage"]);
const player = ref<SVGA.Player>(null as unknown as SVGA.Player);
const el = ref<HTMLDivElement>();

load(props.src);
watch(props, () => {
  if (player.value) {
    initAni(player.value, props, emit as any);
  }
});
onMounted(function () {
  if (el.value) {
    player.value = new SVGA.Player(el.value);
  }
  initAni(player.value, props, emit as any);
});
defineExpose({
  player,
});
</script>
<template>
  <div
    ref="el"
    class="svga"
    :class="{ stretch }"
    :style="({ '--w': width, '--h': height } as StyleValue)"
  ></div>
</template>
<style lang="scss" scoped>
.svga {
  width: var(--w);
  height: var(--h);
  overflow: hidden;
  canvas {
    max-width: 100%;
    max-height: 100%;
    display: block;
    transform: none !important;
  }
  &.stretch {
    canvas {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
