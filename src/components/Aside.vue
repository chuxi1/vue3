<template>
  <div class="aside-container">
    <el-menu :default-active="tag.code" class="el-menu-vertical-demo">
      <template v-for="(item, index) in menu" :key="index">
        <el-menu-item v-if="!item.children" :index="item.code" @click="handleMenuClick(item)">
          <!-- <component :is="item.icon" style="width: 1em; height: 1em; margin-right: 8px" /> -->
          <Aim style="width: 1em; height: 1em; margin-right: 8px" />
          <span>{{ item.className }}</span>
        </el-menu-item>
        <el-sub-menu v-else :index="item.code">
          <template #title>
            <!-- <component :is="item.icon" style="width: 1em; height: 1em; margin-right: 8px" /> -->
            <Aim style="width: 1em; height: 1em; margin-right: 8px" />
            <span>{{ item.className }}</span>
          </template>
          <el-menu-item v-for="(subItem, subIndex) in item.children" :key="subIndex" :index="subItem.code"
            @click="handleMenuClick(subItem)">
            <el-icon>
              <FullScreen />
            </el-icon>
            {{ subItem.className }}
          </el-menu-item>
        </el-sub-menu>
      </template>
    </el-menu>
  </div>
</template>

<script setup lang="ts">
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import { computed, onMounted, ref } from 'vue';
import { userMenus } from '@/api/index'

interface MenuItem {
  code: string;
  className: string;
  icon: string;
  children?: MenuItem[];
}
const menu = ref<MenuItem[]>([]);
const store = useStore();
const router = useRouter();
const currentRoute = ref('index');
const tag = computed(() => store.state.tag);
// const menuItems: MenuItem[] = [
//   { code: '/index', className: '首页', icon: 'House' },
//   {
//     code: '/test',
//     className: '系统管理',
//     icon: 'Link',
//     children: [
//       { code: '/test1', className: '权限管理', icon: 'FullScreen' },
//       { code: '/test2', className: '用户管理', icon: 'FullScreen' },
//       { code: '/test3', className: '字典管理', icon: 'FullScreen' },
//     ],
//   },
// ];

const handleMenuClick = (item: MenuItem) => {
  store.commit('setTag', item);
  router.push(item.code);
  currentRoute.value = item.code;
};
const getUserMenus = () => {
  userMenus().then((res) => {
    const sortedMenu = res.data.sort((a: MenuItem, b: MenuItem) => {
      const hasChildrenA = a.children && a.children.length > 0;
      const hasChildrenB = b.children && b.children.length > 0;
      if (hasChildrenA === hasChildrenB) {
        return b.className.localeCompare(a.className);
      }
      return hasChildrenA ? 1 : -1;
    });
    menu.value = sortedMenu;
  })
};

onMounted(getUserMenus);
</script>
<style scoped lang="less">
.aside-container {
  height: 100%;

  .el-menu-vertical-demo {
    width: 100%;
    height: 100%;
  }

  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }
}
</style>