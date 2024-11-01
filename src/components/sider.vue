<template>
  <n-layout-sider
    @update:collapsed="handleCollapsedUpdate"
    collapse-mode="width"
    :collapsed-width="70"
    :width="250"
    class="sider_container"
    show-trigger="bar"
    :native-scrollbar="false"
  >
    <!-- logo -->
    <div class="logo">
      <n-icon
        class="icon"
        size="40"
        color="#4a2a94"
        :component="ColorFilterSharp"
      />
      <span v-show="!collapsed" class="name">ChatMat</span>
    </div>

    <!-- 菜单 -->
    <n-menu
      :collapsed-width="70"
      :collapsed-icon-size="22"
      :options="menuOptions"
      :value="currentSelect"
      @update:value="selectChange"
      class="menuBox"
    />

    <n-layout-footer position="absolute" class="footerBox" bordered>
      <div class="userBox">
        <div class="userInfo">
          <div class="userAvatar">
            <n-avatar
              round
              v-show="!islogin"
              @click="showLoginPage"
              size="medium"
              src="https://img0.baidu.com/it/u=2082796187,1873236840&fm=253&fmt=auto&app=138&f=JPEG?w=256&h=256"
              fallback-src="https://img2.baidu.com/it/u=1054465629,3785730117&fm=253&fmt=auto&app=138&f=JPEG?w=503&h=500"
            />
            <n-avatar
              round
              v-show="islogin"
              size="medium"
              src="https://sfile.chatglm.cn/activeimg/bdms/66135a5a1bfb5b0037b2bd52"
              fallback-src="https://img2.baidu.com/it/u=1054465629,3785730117&fm=253&fmt=auto&app=138&f=JPEG?w=503&h=500"
            />
          </div>
          <div class="userName" v-if="!collapsed">
            <p @click="showLoginPage" v-show="!islogin">点击登录</p>
            <p v-show="islogin">{{ user.name }}</p>
          </div>
        </div>

        <div class="userOpt" v-if="!collapsed">
          <n-tooltip trigger="hover">
            <template #trigger>
              <n-icon
                class="icon"
                size="18"
                color="#1d0d43"
                :component="ExitOutline"
                @click="logout"
              />
            </template>
            退出登录
          </n-tooltip>

          <n-tooltip trigger="hover">
            <template #trigger>
              <n-icon
                class="icon"
                size="18"
                color="#1d0d43"
                :component="AlertCircleOutline"
              />
            </template>
            问题反馈
          </n-tooltip>

          <n-tooltip trigger="hover">
            <template #trigger>
              <n-icon
                class="icon"
                size="18"
                color="#1d0d43"
                :component="MailOutline"
              />
            </template>
            联系我们
          </n-tooltip>

          <n-tooltip trigger="hover">
            <template #trigger>
              <n-icon
                class="icon"
                size="18"
                color="#1d0d43"
                :component="SettingsOutline"
              />
            </template>
            设置
          </n-tooltip>
        </div>
      </div>
    </n-layout-footer>
  </n-layout-sider>

  <n-modal v-model:show="showModal">
    <n-card class="login_box" size="huge" role="dialog" aria-modal="true">
      <n-tabs
        class="card-tabs"
        default-value="signin"
        size="large"
        animated
        pane-wrapper-style="margin: 0 -4px"
        pane-style="padding-left: 4px; padding-right: 4px; box-sizing: border-box;"
      >
        <n-tab-pane name="signin" tab="登录">
          <n-form>
            <n-form-item-row label="用户名">
              <n-input
                round
                v-model:value="userinfo.username"
                clearable
                placeholder="请输入用户名"
              />
            </n-form-item-row>
            <n-form-item-row label="密码">
              <n-input
                round
                placeholder="请输入密码"
                v-model:value="userinfo.password"
                type="password"
                show-password-on="click"
              />
            </n-form-item-row>
          </n-form>
          <div class="forgetPassword">
            <span>忘记密码</span>
          </div>
          <div style="display: flex; justify-content: center">
            <n-button
              @click="login_byinfo"
              style="width: 20%"
              tertiary
              type="primary"
              round
              block
            >
              登录
            </n-button>
          </div>
        </n-tab-pane>
        <n-tab-pane name="signup" tab="注册">
          <n-form>
            <n-form-item-row label="昵称">
              <n-input
                v-model:value="registerUserinfo.realname"
                round
                clearable
                placeholder="请输入昵称"
              />
            </n-form-item-row>
            <n-form-item-row label="用户名">
              <n-input
                v-model:value="registerUserinfo.username"
                round
                clearable
                placeholder="请输入用户名"
              />
            </n-form-item-row>
            <n-form-item-row label="密码">
              <n-input
                round
                v-model:value="registerUserinfo.password"
                placeholder="请输入密码"
                type="password"
                show-password-on="click"
              />
            </n-form-item-row>
          </n-form>
          <div style="display: flex; justify-content: center">
            <n-button style="width: 20%" tertiary type="primary" round block @click="Register">
              注册
            </n-button>
          </div>
        </n-tab-pane>
      </n-tabs>
    </n-card>
  </n-modal>
</template>

<script>
import { h, defineComponent, ref,onMounted } from "vue";
import { NIcon, useMessage } from "naive-ui";
import { RouterLink } from "vue-router";
import { login,register } from "@/api/index";
import store from "@/store";
import {
  BookOutline as BookIcon,
  ChatbubbleEllipsesOutline,
  SettingsOutline,
  MailOutline,
  AlertCircleOutline,
  ExitOutline,
  ColorFilterSharp,
} from "@vicons/ionicons5";

import {
  Branch20Regular,
  DocumentTextExtract20Regular,
  BoxMultipleSearch24Regular,
} from "@vicons/fluent";

// 菜单选项
const menuOptions = [
  {
    label: () =>
      h(
        RouterLink,
        {
          to: {
            name: "home",
            params: {
              lang: "zh-CN",
            },
          },
        },
        { default: () => "聊天" }
      ),
    key: "chat",
    icon: renderIcon(ChatbubbleEllipsesOutline),
  },
  {
    label: () =>
      h(
        RouterLink,
        {
          to: {
            name: "documentmana",
            params: {
              lang: "zh-CN",
            },
          },
        },
        { default: () => "文献管理" }
      ),
    key: "a-wild-sheep-chase",
    icon: renderIcon(BookIcon),
  },
  {
    label: () =>
      h(
        RouterLink,
        {
          to: {
            name: "docextract",
            params: {
              lang: "zh-CN",
            },
          },
        },
        { default: () => "文本抽取" }
      ),
    key: "docextract",
    icon: renderIcon(DocumentTextExtract20Regular),
  },
  {
    label: () =>
      h(
        RouterLink,
        {
          to: {
            name: "entitymana",
            params: {
              lang: "zh-CN",
            },
          },
        },
        { default: () => "实体管理" }
      ),
    key: "entitymana",
    icon: renderIcon(BoxMultipleSearch24Regular),
  },
  {
    label: () =>
      h(
        RouterLink,
        {
          to: {
            name: "kgraph",
            params: {
              lang: "zh-CN",
            },
          },
        },
        { default: () => "知识图谱" }
      ),
    key: "kgraph",
    icon: renderIcon(Branch20Regular),
  },
  {
    label: () =>
      h(
        RouterLink,
        {
          to: {
            name: "settings",
            params: {
              lang: "zh-CN",
            },
          },
        },
        { default: () => "设置" }
      ),
    key: "settings",
    icon: renderIcon(SettingsOutline),
  },
];

const userOptions = [
  {
    label: "个人中心",
    value: "Drive My Car",
  },
  {
    label: "个人设置",
    value: "Norwegian Wood",
  },
];

function renderIcon(icon) {
  return () => h(NIcon, null, { default: () => h(icon) });
}

const logout = () => {
  store.dispatch("deleteuser");
  islogin.value = false;
  window.$message.success("退出登录成功！");
};

const islogin = ref(false);

const showModal = ref(false);

const userinfo = ref({
  username: "",
  password: "",
});

const registerUserinfo = ref({
  username:"",
  password: "",
  realname: "",
})

const collapsed = ref(false);

const currentSelect = ref("chat");

const handleCollapsedUpdate = (newCollapsedState) => {
  collapsed.value = newCollapsedState;
};

const showLoginPage = () => {
  showModal.value = true;
};

const selectChange = (key) => {
  currentSelect.value = key;
};

const user = ref({});

function login_byinfo() {
  login(userinfo.value).then((res) => {
    const data = res.data.data;
    user.value = data;
    if (res.data.msg == "成功") {
      window.$message.success("登录成功！");
      store.dispatch("setUser", data);
      islogin.value = true;
      showModal.value = false;
    } else {
      window.$message.error("用户名或者密码错误！");
    }
  });
}

function Register(){
   register(registerUserinfo.value).then(res=>{
    window.$message.success("注册成功，等待自动登录！");
    userinfo.value.username = registerUserinfo.value.username
    userinfo.value.password = registerUserinfo.value.password
    login_byinfo()
   })
}

// 菜单折叠状态

export default defineComponent({
  setup() {
    onMounted(() => {
      if(store.getters.isLoggedIn){
        islogin.value = true;
        user.value = store.getters.userinfo;
      }
    });

    window.$message = useMessage();
    return {
      menuOptions,
      ColorFilterSharp,
      login_byinfo,
      handleCollapsedUpdate,
      collapsed,
      Register,
      currentSelect,
      userinfo,
      showModal,
      showLoginPage,
      selectChange,
      SettingsOutline,
      ExitOutline,
      MailOutline,
      AlertCircleOutline,
      logout,
      islogin,
      user,
      registerUserinfo,
      userOptions,
    };
  },
});
</script>

<style lang="scss" scoped>
@import "../css/sider.scss";
</style>
