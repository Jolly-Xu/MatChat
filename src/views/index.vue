<template>
  <div class="home">
    <div class="main_container">
      <div class="chat_container">
        <div class="chat_position">
          <div class="chat_page">
            <div class="scroll_box">
              <div class="chat_main_box" ref="chatref" @scroll="scrollEevent">
                <div class="chat_pre_box" v-if="chatMsgs.length == 0">
                  <div class="pre_box_logo">
                    <n-carousel
                      :space-between="30"
                      slides-per-view="auto"
                      show-arrow
                      :interval="3000"
                      draggable
                    >
                      <n-carousel-item style="width: 30%">
                        <img
                          class="carousel-img"
                          src="https://pic.52112.com/171110/Business_People/tBGtNxp3lb.jpg"
                        />
                        <div class="carouselItem_footer">
                          <div>查找年龄大于20岁且GPA大于3.5的学生名字</div>
                        </div>
                      </n-carousel-item>
                      <!-- <n-carousel-item style="width: 20%">
                        <img
                          class="carousel-img"
                          src="https://pic.52112.com/171110/Business_People/tBGtNxp3lb.jpg"
                        />
                        <div class="carouselItem_footer">
                          <div>列出所有计算机科学专业学生的名字和GPA</div>
                        </div>
                      </n-carousel-item> -->
                      <n-carousel-item style="width: 30%">
                        <img
                          class="carousel-img"
                          src="https://naive-ui.oss-cn-beijing.aliyuncs.com/carousel-img/carousel3.jpeg"
                        />
                        <div class="carouselItem_footer">
                          <div>
                            找出年龄小于等于22岁且名字以字母'A'开头的学生的ID和年龄
                          </div>
                        </div>
                      </n-carousel-item>
                      <n-carousel-item style="width: 40%">
                        <img
                          class="carousel-img"
                          src="https://naive-ui.oss-cn-beijing.aliyuncs.com/carousel-img/carousel4.jpeg"
                        />
                        <div class="carouselItem_footer">
                          <div>列出GPA最高的学生的所有信息</div>
                        </div>
                      </n-carousel-item>
                    </n-carousel>
                  </div>
                </div>

                <div v-for="(msg, index) in chatMsgs" :key="index" class="item">
                  <div class="chat_msg_box">
                    <div class="chat_msg_box_top">
                      <div class="chat_msg_box_top_avatar">
                        <n-avatar
                          round
                          size="medium"
                          :src="msg.avatar"
                          fallback-src="https://t12.baidu.com/it/u=3889196102,199724547&fm=30&app=106&f=JPEG?w=640&h=640&s=6B243A62FEF71BB350A990CB0000A0A1"
                        />
                      </div>
                      <div class="chat_msg_box_top_name">
                        <span>{{ msg.name }}</span>
                      </div>
                    </div>

                    <div class="chat_msg_content">
                      <div
                        v-html="renderMdText(msg.content)"
                        class="mdTextBox"
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="float_box">
            <div
              class="float_button"
              @click="
                chatref?.scrollBy({ top: 9999999999999, behavior: 'smooth' })
              "
            >
              <n-icon
                class="icon"
                size="20"
                color="#474747"
                :component="ArrowDownSharp"
              />
            </div>
          </div>

          <div class="chat_input">
            <div
              :style="changeborder ? dynamicStyles2 : dynamicStyles1"
              class="input_box"
            >
              <div class="input_top">
                <n-upload
                  abstract
                  :default-file-list="fileList"
                  :default-upload="false"
                  @before-upload="beforeUpload"
                  @update:file-list="fileUpdate"
                  :max="1"
                  action="https://www.mocky.io/v2/5e4bafc63100007100d8b70f"
                >
                  <n-popselect
                    v-model:value="currentModel"
                    :options="modeloptions"
                    trigger="click"
                  >
                    <n-tag class="tag" round :bordered="false" checkable>
                      {{ currentModel }}
                      <n-icon
                        class="icon"
                        size="15"
                        color="#4a2a94"
                        :component="ChevronDownOutline"
                      />
                      <template #avatar>
                        <n-icon
                          class="icon"
                          size="20"
                          color="#4a2a94"
                          :component="LogoElectron"
                        />
                      </template>
                    </n-tag>
                  </n-popselect>

                  <n-popselect
                    v-model:value="currentMethod"
                    :options="methondsoptions"
                    trigger="click"
                  >
                    <n-tag class="tag" round :bordered="false" checkable>
                      {{ currentMethod }}
                      <n-icon
                        class="icon"
                        size="15"
                        color="#4a2a94"
                        :component="ChevronDownOutline"
                      />
                      <template #avatar>
                        <n-icon
                          class="icon"
                          size="20"
                          color="#4a2a94"
                          :component="LogoElectron"
                        />
                      </template>
                    </n-tag>
                  </n-popselect>

                  <n-upload-trigger #="{ handleClick }" abstract>
                    <n-tag
                      class="tag"
                      round
                      :bordered="false"
                      checkable
                      @click="handleClick"
                    >
                      文件
                      <template #avatar>
                        <n-icon
                          class="icon"
                          size="20"
                          color="#4a2a94"
                          :component="FileTrayFullOutline"
                        />
                      </template>
                    </n-tag>
                  </n-upload-trigger>

                  <!-- <n-upload-file-list /> -->

                  <n-tag class="tag" round :bordered="false" checkable>
                    图片
                    <template #avatar>
                      <n-icon
                        class="icon"
                        size="20"
                        color="#4a2a94"
                        :component="ImageOutline"
                      />
                    </template>
                  </n-tag>

                  <n-tag class="tag" round :bordered="false" checkable>
                    指令
                    <template #avatar>
                      <n-icon
                        class="icon"
                        size="20"
                        color="#4a2a94"
                        :component="LogoElectron"
                      />
                    </template>
                  </n-tag>

                  <!-- <n-tag class="tag" round :bordered="false" checkable>
                  其他
                  <template #avatar>
                    <n-icon
                      class="icon"
                      size="20"
                      color="#4a2a94"
                      :component="ListCircleOutline"
                    />
                  </template>
                </n-tag> -->

                  <n-tag
                    class="tag_send"
                    v-if="!isSending"
                    round
                    :bordered="false"
                    @click="sendChatMsg"
                  >
                    发送
                    <template #avatar>
                      <n-icon
                        class="icon"
                        size="20"
                        color="#fff"
                        :component="PaperPlane"
                      />
                    </template>
                  </n-tag>

                  <n-tag
                    class="tag_send_stop tag_send"
                    v-else
                    round
                    :bordered="false"
                    @click="sendChatMsg"
                  >
                    停止
                    <template #avatar>
                      <n-icon
                        class="icon"
                        size="20"
                        color="#fff"
                        :component="StopCircleOutline"
                      />
                    </template>
                  </n-tag>

                  <n-upload-file-list />
                </n-upload>
              </div>
              <textarea
                @focus="oncilck"
                @blur="oncilck"
                placeholder="请输入问题,  Enter+Shift换行, Enter发送"
                class="input"
                :style="fileIsExist ? fileExisted : fileNotExisted"
                v-model="sendMsgContent"
                @keydown.enter="send_ready"
              />

              <!-- <div class="input_bottom">
                
              </div> -->
            </div>
          </div>
        </div>
      </div>

      <div class="right_sider">
        <n-tabs type="line" style="height: 100%" animated="true">
          <n-tab-pane style="height: 100%" name="tab1" tab="最近对话">
            <div class="newchat">
              <div class="newchat_top">
                <div class="btn" color="#8a2be2" @click="newchat">
                  新建对话
                  <!-- <n-icon size="20" :component="Add"> </n-icon> -->
                </div>
              </div>
              <div class="newchat_box" v-if="chathistory.length != 0">
                <n-infinite-scroll
                  style="height: 100%"
                  :distance="10"
                  @load="handleLoad"
                >
                  <div
                    v-for="(msg, index) in chathistory"
                    :key="index"
                    class="chat_item"
                  >
                    <div class="left_tag"></div>
                    <div class="content" @click="openHistoryChat(msg.id)">
                      {{ msg.content }}
                    </div>
                  </div>
                </n-infinite-scroll>
              </div>
              <div class="newchat_box_default" v-else>
                <span>暂无历史对话数据</span>
              </div>
            </div>
          </n-tab-pane>
          <n-tab-pane style="height: 100%" name="tab2" tab="工具">
            <div class="databasesBox">
              <!-- <div class="topBox">
                <div class="line"></div>
                <div class="word">上传数据库</div>
              </div>

              <n-upload
                multiple
                directory-dnd
                action="https://www.mocky.io/v2/5e4bafc63100007100d8b70f"
                :max="1"
              >
                <n-upload-dragger>
                  <div style="margin-bottom: 5px">
                    <n-icon size="20" :depth="1" :component="ArchiveOutline">
                    </n-icon>
                  </div>
                  <n-text style="font-size: 0.9rem">
                    点击或者拖动数据库文件到该区域来上传，限制200MB
                  </n-text>
                </n-upload-dragger>
              </n-upload> -->

              <div class="topBox">
                <div class="line"></div>
                <div class="word">上传外部知识库</div>
              </div>

              <n-upload
                multiple
                directory-dnd
                :action="uploadKnowledge"
                method="Post"
              >
                <n-upload-dragger>
                  <div style="margin-bottom: 5px">
                    <n-icon size="20" :depth="3" :component="ArchiveOutline">
                    </n-icon>
                  </div>
                  <n-text style="font-size: 0.9rem">
                    点击或者拖动外部知识库文件到该区域来上传,限制200MB
                  </n-text>
                </n-upload-dragger>
              </n-upload>
            </div>
          </n-tab-pane>
        </n-tabs>
      </div>
    </div>
    <div></div>
  </div>
</template>

<script>
import { defineComponent, onMounted, ref, h } from "vue";
import MarkdownIt from "markdown-it";
import MarkdownItAbbr from "markdown-it-abbr";
import MarkdownItAnchor from "markdown-it-anchor";
import MarkdownItFootnote from "markdown-it-footnote";
import MarkdownItSub from "markdown-it-sub";
import MarkdownItSup from "markdown-it-sup";
import MarkdownItTasklists from "markdown-it-task-lists";
import hljs from "highlight.js/lib/common";
import MarkdownItTOC from "markdown-it-toc-done-right";
import mk from "markdown-it-katex";
import store from "@/store";
import {
  chat2test,
  ConnDatabases,
  getTablesByBasename,
  changeDB,
  getHistory,
  openhistory,
  connecttoDemo,
} from "@/api/index";
import { useMessage, NIcon } from "naive-ui";
import { uploadKnowledgeurl } from "../api/request";
// import { useNotification } from "naive-ui";

import {
  Navigate,
  FileTrayFullOutline,
  ImageOutline,
  LogoElectron,
  ArchiveOutline,
  ListCircleOutline,
  PaperPlane,
  ArrowDownSharp,
  Add,
  ColorFilterSharp,
  ChevronDownOutline,
  StopCircleOutline,
} from "@vicons/ionicons5";

import {
  Database20Filled,
  DocumentTable20Filled,
  TableInsertColumn16Filled,
} from "@vicons/fluent";

// 标识是否聚焦到输入框，判断边框是否变换
const changeborder = ref(true);

// 是否正在发送数据
const isSending = ref(false);

// chatpage的ref对象，对它进行操作
const chatref = ref(null);

const islogin = ref(false);

// 终止请求controller变量
let controller = null;

const sendMsgContent = ref("");

// 模型选择
const modeloptions = [
  {
    label: "GPT-3.5",
    value: "GPT-3.5",
  },
  {
    label: "GPT-4.0",
    value: "GPT-4.0",
  },
  {
    label: "GPT-4O",
    value: "GPT-4O",
  },
  {
    label: "LLM3-7b",
    value: "LLM3-7b",
  },
];

// 方法选择
const methondsoptions = [
  {
    label: "LLM",
    value: "LLM",
  },
  {
    label: "RAG",
    value: "RAG",
  },
  {
    label: "Agent",
    value: "Agent",
  },
];

const fileListRef = ref([
  {
    id: "b",
    name: "file.doc",
    status: "finished",
    type: "text/plain",
  },
]);

// 数据库选择
const databasesSel = ref([
  {
    label: "MySQL",
    value: "mysql",
  },
  {
    label: "SQLite",
    value: "SqlLight",
  },
  {
    label: "OpenGauss",
    value: "opengauss",
  },
]);

// 对话历史数据
const chathistory = ref([]);

// 加载历史对话数据
function openHistoryChat(id) {
  openhistory(id).then((res) => {
    chatMsgs.value.length = 0;
    chatMsgs.value = res.data.result;
    databasesIsConn.value = true;
    let data = res.data.structure;
    let databases = [];
    for (let index1 = 0; index1 < data.length; index1++) {
      const element = data[index1];
      let database = {
        key: data[index1].key,
        label: data[index1].key,
        prefix: () =>
          h(NIcon, null, {
            default: () => h(Database20Filled),
          }),
        children: [],
        istable: false,
        isDB: true,
      };
      for (let index = 0; index < element.children.length; index++) {
        database.children.push({
          key: element.children[index],
          label: element.children[index],
          prefix: () =>
            h(NIcon, null, {
              default: () => h(DocumentTable20Filled),
            }),
          istable: true,
          children: [],
          isDB: false,
        });
      }
      databases.push(database);
    }

    databasesMeau.value = databases;
  });
}

// 对话数据
const chatMsgs = ref([]);

//markdown-it 解析器
const markdown = new MarkdownIt({
  html: false,
  linkify: true,
  typographer: true,
  highlight: function (str, lang) {
    // 此处判断是否有添加代码语言
    if (lang && hljs.getLanguage(lang)) {
      try {
        // 得到经过highlight.js之后的html代码
        const preCode = hljs.highlight(lang, str, true).value;
        // 以换行进行分割
        const lines = preCode.split(/\n/).slice(0, -1);
        // 添加自定义行号
        let html = lines
          .map((item, index) => {
            return (
              '<li><span class="line-num" data-line="' +
              (index + 1) +
              '"></span>' +
              item +
              "</li>"
            );
          })
          .join("");
        html = "<pre class='hljs'><code> <ol>" + html + "</ol></code></pre>";
        // 添加代码语言
        if (lines.length) {
          html =
            '<div class="codeTop"><span class="copy-btn">复制</span> ' +
            '<span class="langname" >' +
            lang +
            "</span></div>" +
            html;
        }
        return html;
      } catch (__) {}
    }
    // 未添加代码语言，此处与上面同理
    const preCode = markdown.utils.escapeHtml(str);
    const lines = preCode.split(/\n/).slice(0, -1);
    let html = lines
      .map((item, index) => {
        return (
          '<li><span class="line-num" data-line="' +
          (index + 1) +
          '"></span>' +
          item +
          "</li>"
        );
      })
      .join("");
    html = "<ol>" + html + "</ol>";
    return '<pre class="hljs"><code>' + html + "</code></pre>";
  },
})
  .use(MarkdownItAbbr)
  .use(MarkdownItAnchor)
  .use(MarkdownItFootnote)
  .use(MarkdownItSub)
  .use(MarkdownItSup)
  .use(MarkdownItTasklists)
  .use(mk)
  .use(MarkdownItTOC);

// 当前选择模型
const currentModel = ref("GPT-3.5");

const currentMethod = ref("LLM");

// 标识是否上滑的状态
let status = true;

// 树状文件
const databasesMeau = ref([]);

// 窗口状态判断，是否上滑动作，停止自动向下滑
function scrollEevent(event) {
  // console.log(chatref.value.scrollTop);
  // console.log(chatref.value.offsetHeight);
  // console.log(chatref.value.scrollHeight);
  // console.log(event);
  if (
    chatref.value.scrollHeight -
      chatref.value.offsetHeight -
      chatref.value.scrollTop >
    50
  ) {
    status = false;
  } else {
    status = true;
  }
}

// 渲染数据
function renderMdText(text) {
  return markdown.render(text);
}

// 新建对话
function newchat() {
  chatMsgs.value.length = 0;
}

// 输入框样式变换
function oncilck() {
  changeborder.value = !changeborder.value;
}

// 复制操作
function copybtn(button) {
  let node = button.parentNode.nextSibling;
  let textToCopy = node.innerText;

  button.addEventListener("click", function (event) {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(textToCopy).then(
        function () {
          button.innerHTML = "已复制";
          setTimeout(() => {
            button.innerHTML = "复制";
          }, 2000);
        },
        function (err) {}
      );
    }
  });
}

// 添加复制按钮
function initClipboard() {
  // 选择所有的复制按钮
  document.querySelectorAll(".copy-btn").forEach((button) => {
    copybtn(button);
  });
}

function send_ready(event) {
  // 是否按下enter键
  if (event.keyCode == 13) {
    if (!event.shiftKey) {
      //只有enter没有shift，或进行你的其他逻辑
      event.preventDefault(); // 阻止默认行为，即不换行
      // 发送
      if (isSending.value) {
        window.$message.warning("请等待问题回答完毕后，再继续提问！");
        return;
      }
      // if (databasesIsConn.value == false) {
      //   window.$message.warning("请先在侧边栏工具中连接数据库！");
      //   return;
      // }
      sendChatMsg();
    }
  }
}

// 封装发送的消息
function packgeSendMsg() {
  let body = {
    id: 11,
    name: store.getters.userinfo.name,
    content: sendMsgContent.value,
    avatar:
      "https://sfile.chatglm.cn/activeimg/bdms/66135a5a1bfb5b0037b2bd52",
  };

  // 如果是第一条数据,存入历史对话中
  if (chatMsgs.value.length == 0) {
    chathistory.value.unshift(body);
  }
  sendMsgContent.value = "";
  chatMsgs.value.push(body);

  chatref.value.scrollTo({ top: 999999999999999, behavior: "auto" });
}

// 发送数据
function sendChatMsg() {
  // 正在发送中，返回
  if (isSending.value) {
    controller.abort();
    return;
  }
  if (!store.getters.isLoggedIn) {
    window.$message.error("请先点击左下角头像进行登录！");
    return;
  }
  if (sendMsgContent.value == "") {
    window.$message.warning("不能发送空信息！");
    return;
  }

  // 请求参数
  let requestbody = {
    content: sendMsgContent.value,
    userid: "1767767",
  };

  packgeSendMsg();
  // 获取两个变量
  const [func, c] = chat2test(requestbody);
  controller = c;

  // 请求
  func
    .then((res) => {
      // 更新发送状态，不能同时发送两个消息
      isSending.value = true;
      // 获取请求中的reader对象
      let reader = res.body.getReader();
      // 数据对象
      let body = {
        id: 10,
        name: "ChatMat",
        content: "",
        avatar:
          "https://t12.baidu.com/it/u=3889196102,199724547&fm=30&app=106&f=JPEG?w=640&h=640&s=6B243A62FEF71BB350A990CB0000A0A1",
      };

      // 添加数据对象到消息列表
      chatMsgs.value.push(body);

      let item = 0;
      // 递归获取数据
      const read = () => {
        reader
          .read()
          .then(({ value, done }) => {
            if (done) {
              // 发送完毕更新状态
              isSending.value = false;
              // 添加复制按钮
              initClipboard();
              return;
            }
            if (item == 0) {
              chatref.value.scrollBy({ top: 9999999999999, behavior: "auto" });
              item = 1;
              status = true;
            }
            // 获取数据
            let chunk = new TextDecoder().decode(value);
            // 更新数据
            chatMsgs.value[chatMsgs.value.length - 1].content += chunk;
            if (
              status &&
              chatref.value.scrollHeight > chatref.value.clientHeight
            ) {
              chatref.value.scrollBy({ top: 50, behavior: "auto" });
            }
            read();
            chatref.value.scrollTo({ top: 999999999999999, behavior: "auto" });
          })
          .catch((err) => {
            // 中断请求错误，更新状态并返回
            isSending.value = false;
            return;
          });
      };
      read();
    })
    .catch((error) => {
      isSending.value = false;
    });
}

async function beforeUpload(data) {
  // console.log(data);
  // if (data.file.file?.type !== "image/png") {
  //   // message.error("只能上传png格式的图片文件，请重新上传");
  //   return false;
  // }
  return true;
}

// 文件上传地址
// 上传知识库地址
const uploadKnowledge = uploadKnowledgeurl;

// 标识文件是否已经在列表中，进行样式变换
const fileIsExist = ref(false);

const fileExisted = {
  height: "60%",
};

const fileNotExisted = {
  height: "80%",
};

// 文件列表更新时的触发函数
function fileUpdate(list) {
  if (list.length == 1) {
    fileIsExist.value = true;
  } else {
    fileIsExist.value = false;
  }
}

function handleLoad() {
  console.log(111);
}

// 数据库连接
const databasesIsConn = ref(false);

const databasesConnMsg = ref({
  databases: null,
  connName: "",
  hostname: "",
  port: "",
  username: "",
  password: "",
  databasename: "",
});

// 连接数据库
function connect2DataBases() {
  ConnDatabases(databasesConnMsg.value).then((res) => {
    let r = res.data;

    let s = "" + r;
    s = s.replaceAll(/'/g, '"');
    let data = JSON.parse(s);
    let databases = [];
    for (let index1 = 0; index1 < data.length; index1++) {
      const element = data[index1];
      let database = {
        key: data[index1].key,
        label: data[index1].key,
        prefix: () =>
          h(NIcon, null, {
            default: () => h(Database20Filled),
          }),
        children: [],
        istable: false,
        isDB: true,
      };
      for (let index = 0; index < element.children.length; index++) {
        database.children.push({
          key: element.children[index],
          label: element.children[index],
          prefix: () =>
            h(NIcon, null, {
              default: () => h(DocumentTable20Filled),
            }),
          istable: true,
          children: [],
          isDB: false,
        });
      }
      databases.push(database);
    }

    databasesMeau.value = databases;
  });

  databasesIsConn.value = true;
}

// 数据库树状结构绑定属性（点击事件）
function connect2Demo() {
  connecttoDemo().then((res) => {
    let r = res.data;

    let s = "" + r;
    s = s.replaceAll(/'/g, '"');
    let data = JSON.parse(s);
    let databases = [];
    for (let index1 = 0; index1 < data.length; index1++) {
      const element = data[index1];
      let database = {
        key: data[index1].key,
        label: data[index1].key,
        prefix: () =>
          h(NIcon, null, {
            default: () => h(Database20Filled),
          }),
        children: [],
        istable: false,
        isDB: true,
      };
      for (let index = 0; index < element.children.length; index++) {
        database.children.push({
          key: element.children[index],
          label: element.children[index],
          prefix: () =>
            h(NIcon, null, {
              default: () => h(DocumentTable20Filled),
            }),
          istable: true,
          children: [],
          isDB: false,
        });
      }
      databases.push(database);
    }

    databasesMeau.value = databases;
  });
  databasesIsConn.value = true;
}

// 点击数据库表
const nodeProps = ({ option }) => {
  return {
    onClick() {
      if (option.isDB) {
        let data = {
          db_name: option.key,
        };
        changeDB(data).then((res) => {
          window.$message.success("选择数据库成功！");
        });
        return;
      }

      if (option.istable) {
        let databaseName = option.key;
        let data = {
          table: databaseName,
        };
        getTablesByBasename(data).then((res) => {
          let array = res.data.columns;
          option.children = [];
          for (let index = 0; index < array.length; index++) {
            const element = array[index];
            option.children.push({
              key: element,
              label: element,
              prefix: () =>
                h(NIcon, null, {
                  default: () => h(TableInsertColumn16Filled),
                }),
              istable: false,
              isDB: false,
            });
          }
        });
      }
    },
  };
};

const user = ref({});

export default defineComponent({
  setup() {
    onMounted(() => {
      initClipboard();
      // getHistory().then((res) => {
      //   let data = res.data.result;
      //   chathistory.value = data;
      //   console.log(data);
      // });
    });
    window.$message = useMessage();

    return {
      sendChatMsg,
      connect2DataBases,
      databasesConnMsg,
      databasesIsConn,
      uploadKnowledge,
      nodeProps,
      changeborder,
      openHistoryChat,
      chatref,
      Navigate,
      handleLoad,
      FileTrayFullOutline,
      ChevronDownOutline,
      databasesSel,
      connect2Demo,
      currentMethod,
      LogoElectron,
      beforeUpload,
      ImageOutline,
      currentModel,
      chathistory,
      send_ready,
      ArchiveOutline,
      methondsoptions,
      databasesMeau,
      fileUpdate,
      ListCircleOutline,
      fileIsExist,
      fileExisted,
      fileNotExisted,
      modeloptions,
      ColorFilterSharp,
      PaperPlane,
      ArrowDownSharp,
      Add,
      renderMdText,
      newchat,
      scrollEevent,
      StopCircleOutline,
      fileListRef,
      sendMsgContent,
      chatMsgs,
      markdown,
      isSending,
      oncilck,
      dynamicStyles1: {
        border: "1px solid #4a2a94",
        "box-shadow": "1px 1px 7px 0px rgba(78, 58, 144, 0.5)",
      },
      dynamicStyles2: {
        border: "1px solid #c3c3c3",
        "box-shadow": "1px 1px 5px 0px rgba(196, 195, 197, 0.75)",
      },
    };
  },
});
</script>

<style scoped lang="scss">
@import "../css/index.scss";
// @import "highlight.js/styles/atom-one-dark.css";
@import "../../node_modules/highlight.js/styles/atom-one-dark.css";
</style>
