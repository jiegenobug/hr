<template>
    <div class="dashboard-container">
        <div class="app-container">
            <el-card class="tree-card">
                <!-- 用了一个行列布局 -->
                <tree-tools :treeNode="company" :isRoot="true"></tree-tools>
                <el-tree :data="departs" :props="defaultProps" :default-expand-all="true">
                    <!-- 作用域插槽 slot-scope="obj" 接收传递给插槽的数据   data 每个节点的数据对象-->
                    <tree-tools slot-scope="{data}" :treeNode="data"></tree-tools>
                </el-tree>
            </el-card>
        </div>
    </div>
</template>
  
<script>
import treeTools from "./components/tree-tools.vue";
export default {
    components: { treeTools },
    data() {
        return {
            company: {
                name: "江苏传智播客教育科技股份有限公司",
                manager: "负责人",
            },
            departs: [
                {
                    name: "总裁办",
                    manager: "曹操",
                    children: [{ name: "董事会", manager: "曹丕" }],
                },
                { name: "行政部", manager: "刘备" },
                { name: "人事部", manager: "孙权" },
            ],
            defaultProps: {
                label: "name", // 表示 从这个属性显示内容
            },
        };
    },
};
</script>
  
<style scoped>
.tree-card {
    padding: 30px 140px;
    font-size: 14px;
}
</style>
  