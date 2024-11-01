<template>
  <div class="home">
    <div class="main_container">
      <div class="table_top">
        <div class="top_select">
          <span class="pre_top_select">列选择:</span>
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
          <n-button strong secondary type="info" round @click="searchPaper()">
            查询
          </n-button>
        </div>
        <div class="top_btn_container">
          <n-button
            strong
            secondary
            type="info"
            round
            @click="showModal = true"
          >
            抽取选项
          </n-button>
        </div>
        <div class="top_btn_container" v-show="showall">
          <n-button
            v-show="showResult"
            strong
            secondary
            type="primary"
            round
            @click="showResult = false"
          >
            返回文档列表
          </n-button>
          <n-button
            v-show="!showResult"
            strong
            secondary
            type="primary"
            round
            @click="showResult = true"
          >
            返回结果展示
          </n-button>
        </div>
      </div>

      <div v-show="!showResult" class="table_container">
        <n-data-table
          :single-line="false"
          :columns="columns"
          :data="data"
          :pagination="pagination"
          striped
          :loading="loading"
          :scroll-x="2200"
          class="table_style"
          :style="{ height: `100%` }"
          flex-height
          remote="true"
        />
      </div>

      <div v-show="showResult" class="resultcontainer">
        <div class="resultLeft">
          <div class="topBox">
            <div class="line"></div>
            <div class="word">抽取结果</div>
            <div class="switch">
              <n-switch v-model:value="check_value" @update:value="handleChange2">
                <template #checked> 实体展示 </template>
                <template #unchecked> 关系展示 </template>
              </n-switch>
            </div>
          </div>
          <div class="result">
            <n-card
              class="resultcard"
              v-show="check_value"
              hoverable
              embedded
              :bordered="true"
              v-for="(item, index) in extractresult"
              :key="index"
              @click="changepdfpage(item)"
            >
              <div class="cardline">实体类型：{{ item.ent_type }}</div>
              <div class="cardline">实体名称：{{ item.ent_name }}</div>
              <div class="cardline">来源文本：{{ item.source_text }}</div>
            </n-card>
          </div>

          <div class="result">
            <n-card
              class="resultcard"
              v-show="!check_value"
              hoverable
              embedded
              :bordered="true"
              v-for="(item, index) in relationdata"
              :key="index"
              @click="changepdfpage(item)"
            >
              <div class="cardline">
                实体名称一：{{ item.entity_1.ent_name }}
              </div>
              <div class="cardline">
                实体名称二：{{ item.entity_2.ent_name }}
              </div>
              <div class="cardline">关系名：{{ item.relation_name }}</div>
              <div class="cardline">
                关系来源： {{ item.entity_2.source_text }}
              </div>
            </n-card>
          </div>
        </div>

        <div class="resultRight">
          <div class="topBox">
            <div class="line"></div>
            <div v-show="!showgraph" class="word">文献展示</div>
            <div v-show="showgraph" class="word">图谱展示</div>
            <div class="switch">
              <n-switch v-model:value="showgraph" @update:value="handleChange">
                <template #checked> 图谱展示 </template>
                <template #unchecked> 文献展示 </template>
              </n-switch>
            </div>
          </div>
          <div class="xmlorpdf" v-show="!showgraph">
            <div v-if="pdforxml" class="pdfcontainer">
              <iframe
                v-if="showResult"
                id="myIframe"
                :src="pdfurl"
                width="100%"
                height="100%"
                frameborder="0"
              ></iframe>
            </div>

            <div v-else id="xml" class="xmlcontainer">
              <div>
                <h1>{{ xml_text.text_title }}</h1>
              </div>

              <div style="margin-top: 1rem">
                <p>{{ xml_text.text_author }}</p>
              </div>

              <div>
                <h3 style="text-align: left; margin-top: 1rem">ABSTRACT</h3>
                <p style="text-indent: 1em; text-align: left; color: #566">
                  {{ xml_text.text_abstract }}
                </p>
              </div>

              <div>
                <p
                  style="
                    text-indent: 1em;
                    text-align: left;
                    color: #566;
                    margin-top: 1rem;
                  "
                >
                  <span style="font-weight: 600; color: black"> Keywords:</span
                  >{{ xml_text.text_keywords }}
                </p>
              </div>

              <div
                :id="'line_' + item.page_num + '_' + item.line_num"
                v-for="(item, index) in xml_text.text"
                :key="index"
                style="text-align: justify; height: auto"
              >
                <p style="text-indent: 1em; height: auto; margin: 0px">
                  {{ item.text }}
                </p>

                <br />
              </div>
            </div>
          </div>

          <div class="graphcontainer" v-show="showgraph">
            <div v-show="ishavegraph" id="neo4jd3" class="neo4jd3"></div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <n-modal v-model:show="showModal">
    <n-card
      class="modal_container"
      title="抽取选项"
      :bordered="false"
      size="huge"
      role="dialog"
      aria-modal="true"
      :segmented="segmented"
    >
      <div class="modal_box">
        <div class="newkeyword">
          <span class="pre_keyword"> 新增关键词: </span>
          <n-dynamic-input
            v-model:value="keywordvalue"
            :on-create="keywordstmp"
          >
            <template #default="{ value }">
              <div class="newkeywordright">
                <n-select
                  class="keywordselect"
                  v-model:value="value.entity_type"
                  :options="keywordstype"
                />
                <n-input
                  class="keywordinput"
                  placeholder="请输入"
                  v-model:value="value.keywords"
                  type="text"
                />
              </div>
            </template>
          </n-dynamic-input>
        </div>

        <div class="keyword_container">
          <span class="pre_keyword">预设关键词：</span>
          <n-checkbox-group v-model:value="checkboxSelect">
            <n-space item-style="display: flex;">
              <n-checkbox
                v-for="(item, index) in keywords"
                :key="index"
                :label="item.entity_type + ':' + item.entity"
                :value="item"
              />
            </n-space>
          </n-checkbox-group>
        </div>
      </div>
      <template #footer>
        <div class="modal_footer">
          <n-button strong secondary round @click="showModal = !showModal">
            取消
          </n-button>
          <n-button
            strong
            secondary
            round
            type="info"
            class="btn"
            @click="extract"
          >
            抽取
          </n-button>
        </div>
      </template>
    </n-card>
  </n-modal>
</template>

<script>
import { defineComponent, ref, onMounted, h } from "vue";
import {
  getdocumentlist,
  documentlisttotal,
  search_paper,
} from "@/api/documentmana.js";
import {
  get_file_keywords,
  postlit,
  get_doc_url,
  get_neo4jbyid,
} from "@/api/docextract";
import { NButton } from "naive-ui";
import Neo4jD3 from "@/assets/js/neo4jd3";
import { useMessage } from "naive-ui";

function createColumns() {
  return [
    {
      title: "序号ID",
      key: "id",
      width: 50,
      fixed: "left",
      align: "center",
    },
    {
      title: "文献标题",
      key: "title",
      align: "center",
      width: 300,
      ellipsis: {
        tooltip: true,
      },
    },
    {
      title: "文献类型",
      key: "liter_type",
      width: 60,
      align: "center",
    },
    {
      title: "发表地方",
      key: "venue",
      align: "center",
      width: 100,
      ellipsis: {
        tooltip: true,
      },
    },
    {
      title: "发表时间",
      key: "pub_time",
      width: 100,
      align: "center",
    },
    {
      title: "卷",
      key: "vol",
      width: 50,
      align: "center",
    },
    {
      title: "期",
      key: "no",
      width: 50,
      align: "center",
    },
    {
      title: "页码",
      key: "page",
      width: 100,
      align: "center",
    },
    {
      title: "作者",
      key: "author",
      width: 100,
      align: "center",
      ellipsis: {
        tooltip: true,
      },
    },
    {
      title: "摘要",
      key: "abstract",
      width: 300,
      align: "center",
      ellipsis: {
        tooltip: true,
      },
    },
    {
      title: "关键词",
      key: "keywords",
      width: 100,
      align: "center",
      ellipsis: {
        tooltip: true,
      },
    },
    {
      title: "doi",
      key: "doi",
      width: 180,
      align: "center",
    },
    {
      title: "操作",
      fixed: "right",
      key: "uptade",
      width: 70,
      align: "center",
      render(row) {
        return h(
          NButton,
          {
            strong: true,
            tertiary: true,
            size: "small",
            type: "info",
            onClick: () => {
              showModal.value = true;
              current_paparId.value = row.id;
              current_papar_type.value = row.liter_type;
            },
          },
          { default: () => "抽取" }
        );
      },
    },
  ];
}

const showgraph = ref(false);

const current_papar_type = ref("");

const ishavegraph = ref(false);

const current_paparId = ref(-1);

const pdforxml = ref(false);

const showModal = ref(false);

const data = ref([]);

const searchValue = ref("");

const current_select = ref("");

const colselect = ref([
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

const keywordstype = ref([
  {
    label: "材料实体",
    value: "材料实体",
  },
  {
    label: "性能",
    value: "性能",
  },
  {
    label: "性能值",
    value: "性能值",
  },
]);

const keywords = ref([]);

const pdfCanvas = ref(null);

const pagination = ref({
  pageSize: 20,
  itemCount: 100,
  showQuickJumper: true,
  onChange: (page) => {
    getdocumentlist(page).then((res) => {
      data.value = res.data;
    });
  },
  prefix({ itemCount }) {
    return `Total is ${itemCount}`;
  },
});

const keywordvalue = ref([]);

const checkboxSelect = ref([]);

const showResult = ref(false);

const extractresult = ref([]);

const pdfurl = ref("");

const check_value = ref(true);

const relation_data = ref([]);

const xml_text = ref({});


function handleChange(value) {
  if (value) {
    get_neo4jbyid(current_paparId.value).then((res) => {
      console.log(res);
      ishavegraph.value =
        res.data.data.results[0].data[0].graph.nodes.length != 0;
      if (ishavegraph.value) {
        init(res.data.data);
      } else {
        window.$message.info("当前文献暂无知识图谱展示！")
      }
    });
  }
}


function handleChange2(value) {
  if (!value && relation_data.value.length == 0) {
    window.$message.info("当前文献暂无关系！")
  }
}

function keywordstmp() {
  return {
    keywords: "",
    entity_type: "材料实体",
    describe: "",
  };
}

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

function changepdfpage(data) {
  if (current_papar_type.value.indexOf("pdf") == -1) {
    changexmlpage(data.line_num, data.source_text, data.page_num);
  } else {
    let keyword = data.source_text;
    let k = keyword.replace(/- /g, "");
    let pdfFrame = document.getElementById("myIframe").contentWindow;
    pdfFrame.document.getElementById("findInput").value = k;
    pdfFrame.document.getElementById("findHighlightAll").click();
  }
}

const last_id = ref("");

function changexmlpage(index, text, page) {
  let last_el = document.getElementById(last_id.value);
  if (last_el != null) {
    last_el.style.cssText = "background-color:transparent;";
  }
  let el = document.getElementById("line_" + page + "_" + index);
  last_id.value = page + "_" + index + Math.random(0, 100);
  let pdf = document.getElementById("xml");
  el.innerHTML = el.innerText.replace(
    text.replace(/\s+/gi, " "),
    `<span id='${last_id.value}' style='background-color:yellow;'>${text}</span>`
  );
  let last = document.getElementById(last_id.value);
  let offsetTop = last.offsetTop - 300;
  pdf.scrollTo({
    top: offsetTop,
    behavior: "smooth",
  });
}

function searchPaper() {
  search_paper(searchValue.value, current_select.value).then((res) => {
    data.value = res.data.data;
    pagination.value.itemCount = res.data.data.length;
  });
}

function getDocument(page) {
  getdocumentlist(page).then((res) => {
    data.value = res.data;
  });
  documentlisttotal().then((res) => {
    pagination.value.itemCount = res.data.data;
  });
}

const showall = ref(false);

function extract() {
  // 准备数据
  let allKeywords = [];
  check_value.value = true
  showgraph.value = false
  allKeywords.push(...keywordvalue.value);
  for (let index = 0; index < checkboxSelect.value.length; index++) {
    const element = checkboxSelect.value[index];
    allKeywords.push({
      describe: "",
      keywords: element.entity,
      entity_type: element.entity_type,
    });
  }
  postlit(allKeywords, current_paparId.value).then((res) => {
    extractresult.value = res.data.entity;
    relation_data.value = res.data.relation;
    showResult.value = true;
    showall.value = true;
    if (current_papar_type.value.indexOf("pdf") != -1) {
      pdforxml.value = true;
      pdfurl.value =
        "/pdfjs-3.11.174-dist/web/viewer.html?file=/api/download_literatures/" +
        current_paparId.value +
        "/";
    } else {
      pdforxml.value = false;
      get_doc_url(current_paparId.value).then((res) => {
        xml_text.value = {
          text: res.data.body_text,
          text_abstract: res.data.abstract,
          text_keywords: res.data.keywords,
          text_title: res.data.title,
          text_author: res.data.author,
        };
      });
    }
    keywordvalue.value = [];
    checkboxSelect.value = [];
    showModal.value = false;
  });
}

export default defineComponent({
  setup() {
    onMounted(() => {
      getDocument(1);
      get_file_keywords().then((res) => {
        keywords.value = res.data.data;
      });
    });

    window.$message = useMessage();
    return {
      data,
      columns: createColumns(),
      pagination,
      showgraph,
      extractresult,
      colselect,
      xml_text,
      showall,
      checkboxSelect,
      changexmlpage,
      handleChange,
      current_select,
      pdforxml,
      ishavegraph,
      showResult,
      check_value,
      searchValue,
      pdfCanvas,
      extract,
      handleChange2,
      searchPaper,
      showModal,
      keywordvalue,
      pdfurl,
      keywordstype,
      changepdfpage,
      keywords,
      keywordstmp,
    };
  },
});
</script>

<style lang="scss" scoped>
@import "../css/docextract.scss";
</style>
