<template>
  <div class="home">
    <div class="main_container">
      <div class="table_top">
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
          <n-button strong secondary type="info" round @click="search"> 查询 </n-button>
        </div>
        <div class="top_btn_container">
          <n-button strong secondary type="primary" round> 返回 </n-button>
        </div>
      </div>
      <div class="table_container">
        <n-data-table
          :single-line="false"
          :columns="columns"
          :data="data"
          :pagination="pagination"
          striped
          :loading="loading"
          :scroll-x="1000"
          class="table_style"
          :style="{ height: `100%` }"
          flex-height
        />
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref, onMounted, h } from "vue";
import { search_entiyname,search_entiy,search_entiyxin } from "@/api/entitymana";
function createColumns() {
  return [
    {
      title: "序号ID",
      key: "id",
      width: 20,
      fixed: "left",
      align: "center",
    },
    {
      title: "实体名",
      key: "ent_name",
      align: "center",
      width: 20,
      ellipsis: {
        tooltip: true,
      },
    },
    {
      title: "实体类型",
      key: "ent_type",
      width: 20,
      align: "center",
    },
    {
      title: "关键字",
      key: "keywords",
      align: "center",
      width: 20,
      ellipsis: {
        tooltip: true,
      },
    },
    {
      title: "来源文本",
      key: "source_text",
      width: 100,
      align: "center",
    },
    {
      title: "文章标题",
      key: "title",
      width: 50,
      align: "center",
    },
  ];
}
const searchValue = ref("Cu–Ag")

const data = ref([]);

const current_select = ref("1");

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

const pagination = ref({
  pageSize: 10,
  itemCount: 100,
  showQuickJumper: true,
  prefix({ itemCount }) {
    return `Total is ${itemCount}`;
  },
});

function getDocument() {
    search_entiyname(searchValue.value).then((res) => {
      data.value = res.data.data
    });
}

function search() {
  if (current_select.value == 1) {
    search_entiyname(searchValue.value).then((res) => {
        data.value = res.data.data
    });
  } else if (current_select.value == 2) {
    search_entiyxin(searchValue.value).then((res) => {
        data.value = res.data.data
    });
  } else {
    search_entiy(current_select.value, searchValue.value).then(
      (res) => {
        data.value = res.data.data
      }
    );
  }
}

export default defineComponent({
  setup() {
    onMounted(() => {
      getDocument();
    });
    return {
      data,
      columns: createColumns(),
      pagination,
      colselect,
      current_select,
      search,
      searchValue,
    };
  },
});
</script>

<style lang="scss" scoped>
@import "../css/entitymana.scss";
</style>
