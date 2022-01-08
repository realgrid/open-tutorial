<template>
    <div class="title-area">
        <router-link to="/">
            <h3 class="title-text">Dashboard</h3>
        </router-link>

        <div class="client">
            <el-menu
                @select="menuSelected"
                text-color="#fff"
                active-text-color="#ffd04b"
                background-color="#2D3A4B"
                style="border-style: none"
            >
                <el-menu-item-group title="관리자 관리">
                    <el-menu-item index="/manager/list">
                        <i class="fas fa-address-book"></i>
                        <span>관리자 목록</span>
                    </el-menu-item>
                    <el-menu-item index="/manager/findPassword">
                        <i class="fas fa-unlock-alt"></i>
                        <span>비번 찾기</span>
                    </el-menu-item>
                </el-menu-item-group>
            </el-menu>
        </div>
    </div>
</template>

<script>
export default {
    methods: {
        menuSelected: function (path) {
            this.$router.push({path: path});
        }
    },
}
</script>

<style scoped>
.title-area {
    margin: 0px;
    background-color: #2D3A4B;
}
.title-text {
    margin: 0px;
    padding: 16px;
    color: white;
    background-color: #2D3A4B;
}
.client {
    height: 100vh;
    background-color: #2D3A4B;
}
.el-menu-item {
    height: 32px;
    font-size: 12px;
}
.fas {
    padding-right: 8px;
}
</style>