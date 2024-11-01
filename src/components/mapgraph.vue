<template>
  <div style="width: 100%; height: 100%" id="myEcharts"></div>
</template>

<script>
import { get_tree_map } from "@/api/graph";
import { defineComponent, ref, onMounted } from "vue";
import * as echarts from "echarts";


function buildChartOption(data) {
  const option = {
    series: [
      {
        type: "treemap",
        data: data,
      },
    ],
  };
  return option;
}

const option = ref({});

const tempdata = []

export default defineComponent({
  setup() {
    onMounted(() => {
        get_tree_map().then(res => {
        tempdata.push(res.data.data)
        option.value = buildChartOption(tempdata)
        let chart = echarts.init(document.getElementById("myEcharts"));
        chart.setOption(option.value)
    })
    });
    return { option };
  },
});
</script>
