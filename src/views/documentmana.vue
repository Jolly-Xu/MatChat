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
            @click="showaddModel = !showaddModel"
          >
            添加文献
          </n-button>
        </div>
        <div class="top_btn_container">
          <n-button strong secondary type="info" round @click=" showaddModel3= true"> 上传文献 </n-button>
        </div>
        <!-- <div class="top_btn_container">
          <n-button strong secondary type="primary" round> 联网搜索 </n-button>
        </div> -->
      </div>
      <div class="table_container">
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

      <n-modal v-model:show="showaddModel">
        <n-card
          class="loadmodel"
          title="添加文献"
          :bordered="false"
          size="huge"
          role="dialog"
          aria-modal="true"
          :segmented="segmented"
        >
          <div class="loadmodel_container">
            <div class="loadmodel_item">
              <n-form
                :label-width="80"
                :model="loadValue"
                label-placement="left"
              >
                <n-form-item label="文献标题">
                  <n-input v-model:value="loadValue.title" />
                </n-form-item>
                <n-form-item label="文献类型">
                  <n-input v-model:value="loadValue.liter_type" />
                </n-form-item>
                <n-form-item label="发表地方">
                  <n-input v-model:value="loadValue.venue" />
                </n-form-item>
                <n-form-item label="发表时间">
                  <n-input v-model:value="loadValue.pub_time" />
                </n-form-item>
                <n-form-item label="卷">
                  <n-input v-model:value="loadValue.vol" />
                </n-form-item>
                <n-form-item label="期">
                  <n-input v-model:value="loadValue.no" />
                </n-form-item>
              </n-form>
            </div>
            <div class="loadmodel_item">
              <n-form
                :label-width="80"
                :model="loadValue"
                label-placement="left"
              >
                <n-form-item label="页码">
                  <n-input v-model:value="loadValue.page" />
                </n-form-item>
                <n-form-item label="作者">
                  <n-input v-model:value="loadValue.author" />
                </n-form-item>
                <n-form-item label="摘要">
                  <n-input v-model:value="loadValue.abstract" />
                </n-form-item>
                <n-form-item label="关键词">
                  <n-input v-model:value="loadValue.keywords" />
                </n-form-item>
                <n-form-item label="doi">
                  <n-input v-model:value="loadValue.doi" />
                </n-form-item>
                <n-form-item label="文件上传">
                  <n-upload
                    action="https://www.mocky.io/v2/5e4bafc63100007100d8b70f"
                    :headers="{
                      'naive-info': 'hello!',
                    }"
                    :data="{
                      'naive-data': 'cool! naive!',
                    }"
                  >
                    <n-button>上传文件</n-button>
                  </n-upload>
                </n-form-item>
              </n-form>
            </div>
          </div>
          <template #footer>
            <div class="modal_footer">
              <n-button
                strong
                secondary
                round
                @click="showaddModel = !showaddModel"
              >
                取消
              </n-button>
              <n-button
                strong
                secondary
                round
                type="info"
                class="btn"
                @click="paper_add"
              >
                添加
              </n-button>
            </div>
          </template>
        </n-card>
      </n-modal>

      <n-modal v-model:show="showaddModel2">
        <n-card
          class="loadmodel"
          title="添加文献"
          :bordered="false"
          size="huge"
          role="dialog"
          aria-modal="true"
          :segmented="segmented"
        >
          <div class="loadmodel_container">
            <div class="loadmodel_item">
              <n-form
                :label-width="80"
                :model="updateValue"
                label-placement="left"
              >
                <n-form-item label="文献标题">
                  <n-input v-model:value="updateValue.title" />
                </n-form-item>
                <n-form-item label="文献类型">
                  <n-input v-model:value="updateValue.liter_type" />
                </n-form-item>
                <n-form-item label="发表地方">
                  <n-input v-model:value="updateValue.venue" />
                </n-form-item>
                <n-form-item label="发表时间">
                  <n-input v-model:value="updateValue.pub_time" />
                </n-form-item>
                <n-form-item label="卷">
                  <n-input v-model:value="updateValue.vol" />
                </n-form-item>
                <n-form-item label="期">
                  <n-input v-model:value="updateValue.no" />
                </n-form-item>
              </n-form>
            </div>
            <div class="loadmodel_item">
              <n-form
                :label-width="80"
                :model="loadValue"
                label-placement="left"
              >
                <n-form-item label="页码">
                  <n-input v-model:value="updateValue.page" />
                </n-form-item>
                <n-form-item label="作者">
                  <n-input v-model:value="updateValue.author" />
                </n-form-item>
                <n-form-item label="摘要">
                  <n-input v-model:value="updateValue.abstract" />
                </n-form-item>
                <n-form-item label="关键词">
                  <n-input v-model:value="updateValue.keywords" />
                </n-form-item>
                <n-form-item label="doi">
                  <n-input v-model:value="updateValue.doi" />
                </n-form-item>
                <n-form-item label="文件上传">
                  <n-upload
                    action="https://www.mocky.io/v2/5e4bafc63100007100d8b70f"
                    :headers="{
                      'naive-info': 'hello!',
                    }"
                    :data="{
                      'naive-data': 'cool! naive!',
                    }"
                  >
                    <n-button>上传文件</n-button>
                  </n-upload>
                </n-form-item>
              </n-form>
            </div>
          </div>
          <template #footer>
            <div class="modal_footer">
              <n-button
                strong
                secondary
                round
                @click="showaddModel2 = !showaddModel2"
              >
                取消
              </n-button>
              <n-button
                strong
                secondary
                round
                type="info"
                class="btn"
                @click="update_submit"
              >
                修改
              </n-button>
            </div>
          </template>
        </n-card>
      </n-modal>

      <n-modal v-model:show="showaddModel3">
        <n-card
          class="loadmodel3"
          title="上传文献"
          :bordered="false"
          aria-modal="true"
          :segmented="segmented"
        >
          <n-upload
            multiple
            directory-dnd
            action="https://www.mocky.io/v2/5e4bafc63100007100d8b70f"
            :max="5"
          >
            <n-upload-dragger>
              <div style="margin-bottom: 12px">
                <n-icon size="20" :depth="3" :component="ArchiveOutline"></n-icon>
              </div>
              <n-text style="font-size: 16px">
                点击或者拖动文件到该区域来上传
              </n-text>
              <n-p depth="3" style="margin: 8px 0 0 0">
                支持多类型文件上传，单文件大小不得超过80MB
              </n-p>
            </n-upload-dragger>
          </n-upload>
          <template #footer>
            <div class="modal_footer">
              <n-button
                strong
                secondary
                round
                @click="showaddModel3 = !showaddModel3"
              >
                取消
              </n-button>
              <n-button
                strong
                secondary
                round
                type="info"
                class="btn"
                @click="update_submit"
              >
                上传
              </n-button>
            </div>
          </template>
        </n-card>
      </n-modal>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref, onMounted, h } from "vue";
import {
  getdocumentlist,
  documentlisttotal,
  search_paper,
  paper_add_api,
  updata_doc,
  delete_doc,
} from "@/api/documentmana.js";
import { NButton, useMessage, useDialog } from "naive-ui";
import {
  ArchiveOutline,
} from "@vicons/ionicons5";




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
      width: 200,
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
      title: "删除",
      fixed: "right",
      key: "delete",
      width: 70,
      align: "center",
      render(row) {
        return h(
          NButton,
          {
            strong: true,
            tertiary: true,
            size: "small",
            type: "error",
            onClick: () => {
              deleteRow(row);
            },
          },
          { default: () => "删除" }
        );
      },
    },
    {
      title: "更新",
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
              updateValue.value = row;
              showaddModel2.value = true;
            },
          },
          { default: () => "更新" }
        );
      },
    },
  ];
}

const updateValue = ref({});

const data = ref([]);

const current_select = ref("");

const showaddModel = ref(false);

const searchValue = ref("");

const user = ref({});

const showaddModel2 = ref(false);

const loadValue = ref({});

const curentpage = ref(1);

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

const showaddModel3 = ref(false)

const pagination = ref({
  pageSize: 20,
  itemCount: 100,
  showQuickJumper: true,
  onChange: (page) => {
    curentpage.value = page;
    getdocumentlist(page).then((res) => {
      data.value = res.data;
    });
  },
  prefix({ itemCount }) {
    return `Total is ${itemCount}`;
  },
});

function getDocument(page) {
  getdocumentlist(page).then((res) => {
    data.value = res.data;
  });
  documentlisttotal().then((res) => {
    pagination.value.itemCount = res.data.data;
  });
}

function paper_add() {
  loadValue.value.creator = 1;
  paper_add_api(loadValue.value).then((res) => {
    if (res.status == "200") {
      documentlisttotal().then((res) => {
        pagination.value.itemCount = res.data.data;
      });
      window.$message.success("添加成功！");
    } else {
      window.$message.error("添加失败！");
    }
    showaddModel.value = false;
    loadValue.value = {};
  });
}

function update_submit() {
  updata_doc(1, updateValue.value).then((res) => {
    console.log(res);
  });
}

function deleteRow(data) {
  window.$dialog.warning({
    title: "警告",
    content: "你确定删除当前文档？",
    positiveText: "确定",
    negativeText: "不确定",
    onPositiveClick: () => {
      console.log(data.id);

      delete_doc(data.id).then((res) => {
        window.$message.success("删除成功");
        getDocument(curentpage.value);
      });
    },
    onNegativeClick: () => {},
  });
}

function searchPaper() {
  search_paper(searchValue.value, current_select.value).then((res) => {
    data.value = res.data.data;
    pagination.value.itemCount = res.data.data.length;
  });
}

export default defineComponent({
  setup() {
    onMounted(() => {
      getDocument(1);
    });
    window.$message = useMessage();
    window.$dialog = useDialog();
    return {
      data,
      columns: createColumns(),
      showaddModel3,
      pagination,
      updateValue,
      colselect,
      showaddModel2,
      current_select,
      showaddModel,
      ArchiveOutline,
      searchValue,
      loadValue,
      paper_add,
      update_submit,
      user,
      deleteRow,
      searchPaper,
    };
  },
});
</script>

<style lang="scss" scoped>
@import "../css/documentmana.scss";
</style>
