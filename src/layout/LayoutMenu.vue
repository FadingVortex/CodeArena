<script setup>
import { useRouter } from 'vue-router'
const menu = [
  {
    index: "1",
    title: "课程实训",
    icon: "Loading",
    children: [
        {
            index: '1-1',
            title: '计算思维',
            path: '/course/think/home',
            // path: '/login'
        },
        {
            index: '1-2',
            title: '硬件开发',
            path: '/course/hard/home',
        },
        {
            index: '1-3',
            title: '软件开发',
            path: '/course/soft/home',
        }
    ]
  }, 
  {
    index: "2",
    title: "专业实习",
    // icon: "Star",
    icon: "CoffeeCup",
    children: [
        {
            index: '2-1',
            title: '集中实训'
        },
        {
            index: '2-2',
            title: '企业实习'
        }
    ]
  }, 
  {
    index: "3",
    title: "毕业设计",
    icon: "Plus",
    children: [
        {
            index: '3-1',
            title: '选题申报'
        },
        {
            index: '3-2',
            title: '开题答辩'
        },
        {
            index: '3-3',
            title: '过程指导'
        },
        {
            index: '3-4',
            title: '论文撰写'
        },
        {
            index: '3-5',
            title: '论文答辩'
        },
        {
            index: '3-6',
            title: '论文提交'
        },
    ]
  },
  {
    index: "4",
    title: "临时测试",
    path: "/test",
    icon: "More"
  }, 
  {
    index: "5",
    title: "系统管理",
    icon: "Minus",
    children: [
        {
            index: '5-1',
            title: '思维题库',
        }
    ]
  },  
]
const router = useRouter();

const handleOpen = () => {
    console.log("handleOpen");
}
const handleClose = () => {
    console.log("handleClose");
}
const handleItemClick = (item,sub) => {

}

</script>

<template>
    <el-menu
        :router="true"
        default-active="2"
        class="el-menu-vertical-demo"
        :unique-opened="true"
        @open="handleOpen"
        @close="handleClose"
      >
        <template v-for="(sub, pt) in menu" :key="pt">
            <el-sub-menu v-if="sub.children!==undefined" :index="sub.index"
            >
            <template #title>
                <el-icon>
                    <component :is="sub.icon"></component>
                </el-icon>
                <span>{{sub.title}}</span>
            </template>
                <el-menu-item v-for="item in sub.children" :key="item.index" :index="item.index" :route="item.path" >
                    {{ item.title }}
                </el-menu-item>
            </el-sub-menu>
            <el-menu-item v-else :index="sub.index" :route="sub.path">
                <el-icon><component :is="sub.icon"></component></el-icon>
                {{ sub.title }}
            </el-menu-item>
        </template>
      </el-menu>
</template>

<style scoped>
</style>