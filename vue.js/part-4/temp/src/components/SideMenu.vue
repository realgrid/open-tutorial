<template>
    <div class="header">
        <h3 class="title">Dashboard</h3>
        <div class="client">
            <el-menu
                default-active="2"
                class="el-menu-vertical-demo"
                @select="menuSelected"
                text-color="#fff"
                active-text-color="#ffd04b"
                background-color="#2D3A4B"
                router="true"
                style="border-style: none"
            >
                <el-menu-item-group title="관리자 관리">
                    <el-menu-item index="home">
                        <i class="fas fa-address-book"></i>
                        <span>관리자 목록</span>
                    </el-menu-item>
                    <el-menu-item index="1-2">
                        <i class="fas fa-unlock-alt"></i>
                        <span>비번 찾기 / 수정</span>
                    </el-menu-item>
                </el-menu-item-group>
            </el-menu>
        </div>
    </div>
</template>

<script>
export default {
    methods: {
        menuSelected(key, keyPath) {
            console.log("open", key, keyPath);
        },
    },
};
</script>

<style scoped>
.header {
    margin: 0px;
    background-color: #2D3A4B;
}
.title {
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