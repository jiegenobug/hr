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
import { getDepartments } from "@/api/departments";
import treeTools from "./components/tree-tools.vue";
import { tranListToTreeData } from "@/utils";
export default {
    components: { treeTools },
    data() {
        return {
            company: {
                // name: "",
                // manager: "",
            },
            departs: [
                // {
                //     name: "总裁办",
                //     manager: "曹操",
                //     children: [{ name: "董事会", manager: "曹丕" }],
                // },
                // { name: "行政部", manager: "刘备" },
                // { name: "人事部", manager: "孙权" },
            ],
            defaultProps: {
                label: "name", // 表示 从这个属性显示内容
            },
        };
    },
    created() {
        this.getDepartments();
    },
    methods: {
        async getDepartments() {
            const result = await getDepartments();
            this.company = { name: result.companyName, manager: "负责人" };
            this.departs = tranListToTreeData(result.depts, "");
            console.log(this.departs);
        },
    },
};
</script>
  
<style scoped>
.tree-card {
    padding: 30px 140px;
    font-size: 14px;
}
</style>
  