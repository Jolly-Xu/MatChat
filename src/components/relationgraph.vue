<template>
  <div style="width: 90%; height: 90%" id="myEcharts"></div>
</template>

<script>
import { get_relation } from "@/api/graph";
import { defineComponent, ref, onMounted } from "vue";
import * as echarts from "echarts";


function buildChartOption(nodes, links, categories) {
  const option = {
    title: {
      text: "关系图",
      subtext: "Circular layout",
      top: "bottom",
      left: "right",
    },
    tooltip: {},
    legend: [
      {
        data: categories.map(function (a) {
          return a.name;
        }),
        textStyle: {
          fontSize: 20,
          color: "#f2a655",
        },
      },
    ],

    animationDurationUpdate: 1500,
    animationEasingUpdate: "quinticInOut",
    series: [
      {
        name: "关系图",
        type: "graph",
        layout: "circular",
        circular: {
          rotateLabel: true,
        },
        data: nodes,
        links: links,
        categories: categories,
        roam: true,
        label: {
          fontSize: 20,
          position: "right",
          formatter: "{b}",
          textStyle: {
            fontSize: 20,
            color: "#f2a655",
          },
        },
        lineStyle: {
          color: "source",
          curveness: 0.3,
        },
      },
    ],
  };
  return option;
}

const option = ref({});

export default defineComponent({
  setup() {
    onMounted(() => {
      get_relation().then((res) => {
        console.log(res);
        
        const nodes = res.data.data.nodes;
        const links = res.data.data.links;
        const categories = res.data.data.categories;
        option.value = buildChartOption(nodes, links, categories);
        let chart = echarts.init(document.getElementById("myEcharts"), "purple-passion");
        chart.setOption(option.value)
        
      });
    });
    return { option };
  },
});
</script>

