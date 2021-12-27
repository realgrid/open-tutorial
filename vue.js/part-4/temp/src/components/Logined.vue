<template>
    <el-row>
        <el-col :span=4>
            <SideMenu />
        </el-col>
        <el-col :span=20 class="main-client">
            <router-view />
        </el-col>
    </el-row>
</template>

<script>
import SideMenu from './SideMenu.vue'

export default {
    components: {SideMenu}
}
</script>