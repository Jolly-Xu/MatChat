<template>
  <div class="home">
    <div class="main_container">
      <div class="graph_top">
        <div class="top_select">
          <span class="pre_top_select">查询属性:</span>
          <n-select
            v-model:value="current_select"
            placeholder="Select"
            :options="colselect"
          />
        </div>
        <div class="top_content">
          <span class="pre_top_content">查询内容:</span>
          <n-input
            v-model:value="searchValue"
            type="text"
            placeholder="输入查询内容"
            clearable
          />
        </div>
        <div class="top_btn_container">
          <n-button strong secondary type="info" round @click="search">
            查询
            <template #icon>
              <n-icon>
                <Search />
              </n-icon>
            </template>
          </n-button>
        </div>
        <div class="top_btn_container">
          <n-button strong secondary @click="change(1)" round>
            <template #icon>
              <n-icon>
                <GitBranchOutline />
              </n-icon>
            </template>
            知识图谱
          </n-button>
        </div>
        <div class="top_btn_container">
          <n-button strong secondary @click="change(2)" round>
            <template #icon>
              <n-icon>
                <DataTreemap20Regular />
              </n-icon>
            </template>
            矩阵布局
          </n-button>
        </div>
        <div class="top_btn_container">
          <n-button strong secondary @click="change(3)" round>
            <template #icon>
              <n-icon>
                <CubeTree20Regular />
              </n-icon>
            </template>
            树状布局
          </n-button>
        </div>
        <div class="top_btn_container">
          <n-button strong secondary @click="change(4)" round>
            <template #icon>
              <n-icon>
                <LinkSquare20Regular />
              </n-icon>
            </template>
            关系布局
          </n-button>
        </div>
      </div>

      <div class="graph">
        <div v-if="current_gird == 1" id="neo4jd3" class="neo4jd3"></div>
        <div v-else-if="current_gird == 4" class="relation">
          <relationgraph />
        </div>
        <div v-else-if="current_gird == 3" class="tree">
          <treegraph />
        </div>
        <div v-else-if="current_gird == 2" class="map">
          <mapgraph />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref, onMounted } from "vue";
import { search_neotitle, getMKG, getMKG2 } from "@/api/kgraph";
import Neo4jD3 from "@/assets/js/neo4jd3";
import relationgraph from "@/components/relationgraph.vue";
import treegraph from "@/components/treegraph.vue";
import mapgraph from "@/components/mapgraph.vue";

import { Search, GitBranchOutline } from "@vicons/ionicons5";

import {
  CubeTree20Regular,
  DataTreemap20Regular,
  LinkSquare20Regular,
} from "@vicons/fluent";

function init(graphData) {
  new Neo4jD3("#neo4jd3", {
    highlight: [
      {
        class: "Project",
        property: "name",
        value: "neo4jd3",
      },
      {
        class: "User",
        property: "userId",
        value: "eisman",
      },
    ],
    minCollision: 50,

    neo4jData: graphData,

    nodeRadius: 10,
    onNodeDoubleClick: function (node) {
      switch (node.id) {
        case "25":
          window.open(node.properties.url, "_blank");
          break;
        default:
          var maxNodes = 5;

          break;
      }
    },
    onRelationshipDoubleClick: function (relationship) {},
    zoomFit: true,
  });
}

const colselect = ref([
  {
    label: "实体",
    value: "1",
  },
  {
    label: "性能",
    value: "2",
  },
  {
    label: "文献标题",
    value: "title",
  },
  {
    label: "文献类型",
    value: "liter_type",
  },
  {
    label: "发表地方",
    value: "venue",
  },
  {
    label: "发表时间",
    value: "pub_time",
  },
  {
    label: "卷",
    value: "vol",
  },
  {
    label: "期",
    value: "no",
  },
  {
    label: "页码",
    value: "page",
  },
  {
    label: "作者",
    value: "author",
  },
  {
    label: "作者单位",
    value: "affiliation",
  },
  {
    label: "摘要",
    value: "abstract",
  },
  {
    label: "关键词",
    value: "keywords",
  },
  {
    label: "doi",
    value: "doi",
  },
]);

const current_select = ref("1");

const searchValue = ref("");

const current_gird = ref(1);

function change(value) {
  current_gird.value = value;
  if (value == 1) {
    search_neotitle().then((res) => {
      init(res.data.data);
    });
  }
}

function search() {
  if (current_select.value == "1" || current_select.value == "2") {
    getMKG(searchValue.value, current_select.value).then((res) => {
      init(res.data.data);
    });
  } else {
    getMKG2(searchValue.value, current_select.value).then((res) => {
      init(res.data.data);
    });
  }
}

export default defineComponent({
  setup() {
    onMounted(() => {
      if (current_gird.value == 1) {
        search_neotitle().then((res) => {
          init(res.data.data);
        });
      }
    });
    return {
      colselect,
      current_select,
      searchValue,
      search,
      current_gird,
      change,
    };
  },

  components: {
    relationgraph,
    treegraph,
    mapgraph,
    Search,
    GitBranchOutline,
    CubeTree20Regular,
    DataTreemap20Regular,
    LinkSquare20Regular,
  },
});
</script>
<style lang="scss" scoped>
@import "../css/kgraph.scss";
</style>
