<template>
  <div style="width: 100%; height: 100%" id="myEcharts"></div>
</template>

<script>
import { get_tree } from "@/api/graph";
import { defineComponent, ref, onMounted } from "vue";
import * as echarts from "echarts";

function buildChartOption(data1) {
  const option = {
    tooltip: {
      trigger: "item",
      triggerOn: "mousemove",
    },
    legend: {
      top: "2%",
      left: "3%",
      orient: "vertical",
      data: [],
      borderColor: "#c23531",
      textStyle: {
        color: "rgba(0,0,255,0.7)",
      },
    },
    series: [
      {
        type: "tree",
        name: "性能",
        data: [data1],
        top: "5%",
        left: "7%",
        bottom: "2%",
        right: "60%",
        symbolSize: 10,
        label: {
          position: "left",
          verticalAlign: "middle",
          align: "right",
          textStyle: {
            fontSize: 14,
            color: "#f2a655",
          },
        },
        leaves: {
          label: {
            position: "right",
            verticalAlign: "middle",
            align: "left",
          },
        },
        emphasis: {
          focus: "descendant",
        },
        expandAndCollapse: true,
        animationDuration: 550,
        animationDurationUpdate: 750,
      },
    ],
  };
  return option;
}

const option = ref({});

export default defineComponent({
  setup() {
    onMounted(() => {
      get_tree().then((res) => {
        const data = res.data.data;
        option.value = buildChartOption(data);
        let chart = echarts.init(
          document.getElementById("myEcharts"),
          "purple-passion"
        );
        chart.setOption(option.value);
      });
    });
    return { option };
  },
});
</script>
