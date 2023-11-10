<template>
  <div class="record">
    <!-- <h1>余额</h1> -->
    <div class="yue"></div>
  </div>
</template>

<script lang="ts" setup>
import * as echarts from "echarts";
import { onMounted } from "vue";
import { api, GET } from "./common";
onMounted(() => {
  const myChart = echarts.init(
    document.querySelector(".yue") as HTMLDivElement
  );
  const option = {
    xAxis: {
      type: "category",
      data: [] as string[],
      name: "日期",
    },
    yAxis: [
      {
        type: "value",
        name: "余额(w)",
      },
      {
        type: "value",
        name: "新增(w)",
      },
    ],
    series: [
      {
        data: [] as number[],
        type: "bar",
      },
      {
        data: [] as number[],
        type: "line",
        yAxisIndex: 1,
      },
    ],
    tooltip: {
      show: true,
      trigger: "axis",
      formatter: "余额: {c0}<br />新增: {c1}",
    },
  };
  GET(api.record + location.search).then((res) => {
    let data = res;
    data.forEach((item, i) => {
      option.xAxis.data.push(item.dt);
      option.series[0].data.push(item.value);
      if (i > 0) {
        option.series[1].data.push(item.value - data[i - 1].value);
      }
    });
    myChart.setOption(option);
  });
});
</script>

<style lang="scss" scoped>
@import "./mixin.scss";
.yue {
  margin: 0 auto;
  width: 1000px;
  height: 500px;
}
</style>
<style>
@font-face {
  font-family: num;
  src: url(./font/num.OTF);
}
html,
body {
  background-color: #f0f2f6 !important;
}
.ani {
  pointer-events: none;
}
* {
  line-height: 1;
}
</style>
