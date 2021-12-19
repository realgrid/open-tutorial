# 로그인 처리


## 개요

지난 에피소드에서 작성했던 기본 코드를 토대로 로그인 처리를 추가하도록 하겠습니다.


## Login.vue 생성하기

src/components/Login.vue 파일을 생성하고 아래와 같이 코드를 작성한 뒤 저장합니다.

``` html
<template>
    <h3>Login</h3>
</template>

<script>
export default {
};
</script>
```

## Main.vue 생성하기

src/components/Main.vue 파일을 생성하고 아래와 같이 코드를 작성한 뒤 저장합니다.

``` html
<template>
    <h3>Main</h3>
</template>

<script>
export default {
};
</script>
```

## Home.vue 수정하기

로그인이 되었을 때에는 Main.vue가 표시되도록 하여 앞으로 작성하려는
관리 화면을 보이도록 하려고 합니다.
로그인이 되지 않은 사용자에게는 로그인 화면을 띄워서 사용자를 인증하는 과정을 거치겠습니다.

아래 코드를 저장하면 에러가 발생하는데요.
로그인 유무는 store를 이용하려고 하지만, 아직 코드가 작성되기 전이기 때문입니다.

``` html
<template>
    <div>
        <Login v-if="!this.$store.getters.isLogined" />
        <Main v-if="this.$store.getters.isLogined" />
    </div>
</template>

<script>
import Main from "@/components/Main.vue";
import Login from "@/components/Login.vue";

export default {
    components: { Main, Login },
};
</script>
```


## store 수정

store는 Vue.js에서 상태관리를 담당하고 있습니다.
우선 상태관리에 익숙하지 않으신 분들은
어플리케이션 전역에서 사용할 수 있는 특수한 전역 변수라고 생각하셔도 됩니다.

다만 일반적인 변수와 가장 다른 점은 store에서 관리하는 데이터인 state(상태)가 변경되면
이것을 사용하고 있는 모든 UI에 바로 변경된 데이터가 자동으로 적용이 된다는 점입니다.

보다 자세한 것은 차차 배워가도록 하겠습니다.

src/store/index.js를 열고 아래와 같이 수정해줍니다.

``` js
...
export default createStore({
    state: {
        token: "",
    },
    getters: {
        isLogined: (state) => {
            return state.token !== "";
        },
    },
    actions: {
        updateToken({commit}, token) {
            commit("UPDATE_TOKEN", token);
        },
    },
    mutations: {
        UPDATE_TOKEN(state, token) {
            state.token = token;
        },
    },
    ...
})
```

코드를 저장하면 로그인 한 적이 없기 때문에 Login.vue가 표시되면 정상입니다.


## Login.vue 수정

``` html
<template>
    <div>
        <el-input type="text" v-model="loginForm.email" /><br><br>
        <el-input type="password" v-model="loginForm.password" /><br><br>
        <el-button @click="login">Login</el-button>
    </div>
</template>

<script>
import apiManagers from '@/api/manager'

export default {
    data() {
        return {
            loginForm: {
                email: "",
                password: "",
            },
        };
    },
    methods: {
        login() {
            apiManagers
                .signin(this.loginForm.email, this.loginForm.password)
                .then((response) => {
                    if (response.data.resultCode !== 0) {
                        this.$message.error(response.data.errorMsg);
                        return;
                    }
                    this.$router.push({path: "/"});
                })
                .catch((e) => {
                    console.log(e);
                });
        },
    },
};
</script>
```


## md5 설치

암호를 그대로 DB에 저장하고 사용하는 것은 위험하므로
md5를 이용해서 암호를 인코딩 후 저장하는 방식을 사용하겠습니다.

```
C:\..> npm install md5 --save
```


## 로그인 / 로그아웃 API 추가

DB와 마찬가지로 실제 API 서버를 구축하지 않고
자바스크립트로 쉽게 처리하여 Vue.js 실습에 보다 무게를 두겠습니다.

src 폴더 밑에 api 폴더를 생성하고 manager.js 파일을 추가하겠습니다.
그리고 아래의 코드를 입력하고 저장합니다.

``` js
import store from '@/store'
import managers from '@/data/managers'
import md5 from 'md5'

let response = {
    data: {
        resultCode: 0,
        errorMsg: ""
    }
}

export default {
    signin: async function (email, pw) {
        pw = md5(pw).toUpperCase();
        return new Promise((resolve) => {
            const found = managers.find((e) => {
                console.log("manager.signin", email, pw, e.email, e.pw);
                if ((e.email === email) && (e.pw === pw)) return e;
            });
            setTimeout(() => {
                if (found) {
                    store.dispatch("updateToken", found.email);
                    response.data.resultCode = 0;
                    response.data.errorMsg = "";
                } else {
                    store.dispatch("updateToken", "");
                    response.data.resultCode = 101;
                    response.data.errorMsg = "아이디 또는 암호가 틀렸습니다.";
                }
                resolve(response);
            }, 1000);
        });
    },
    signout: async function () {
        return new Promise((resolve) => {
            store.dispatch("updateToken", "");
            let response = {
                data: {
                    resultCode: 0
                }
            }
            setTimeout(() => resolve(response), 1000);
        });
    },
}
```


## 초기 계정 설정하기

src 폴더 밑에 data 폴더를 생성하고 managers.js 파일을 추가하겠습니다.
그리고 아래의 코드를 입력하고 저장합니다.
초기 계정의 아이디와 암호를 아래와 같이 지정하고 사용하겠습니다.

* admin / 81DC9BDB52D04DC20036DBD8313ED055 (1234의 md5 인코딩 결과값)

실제 DB 시스템을 사용하지 않고 자바스크립트로 쉽게 처리하여 Vue.js 실습에 보다 무게를 두겠습니다.

``` js
export default [
      {
        email: "admin",
        pw: "81DC9BDB52D04DC20036DBD8313ED055",
        name: "기본관리자",
        rule: "관리자",
        phoneNumber: "000-0000-0000"
      },
]
```


## 로그인 테스트

![](./pic-1.png)


## 디자인 개선

Login.vue의 코드를 아래처럼 수정하시면
로그인 과정 중에 애니메이션이 표시되는 등의 개선된 UI를 완성할 수 있습니다.

이전 에피소드에서 설치했던 [Font Awesome](https://fontawesome.com/v5.15/icons?d=gallery&p=1)과
디자인 참고 사이트의 자료를 응용해보았습니다.

지금의 파트에서는 Vue.js에 보다 집중하고 UI에 대해서는 다루지는 않을 에정입니다.
UI 자료 및 코드는 참고만 해주시기 바랍니다.

``` html
<template>
    <div class="login-container">
        <el-form
            ref="loginForm"
            :model="loginForm"
            :rules="loginRules"
            class="login-form"
            autocomplete="on"
            label-position="left"
        >
            <div class="title-container">
                <h3 class="title">Login Form</h3>
            </div>

            <el-form-item prop="email">
                <span class="svg-container">
                    <i class="fas fa-user"></i>
                </span>
                <el-input
                    ref="email"
                    v-model="loginForm.email"
                    placeholder="email"
                    name="email"
                    type="text"
                    tabindex="1"
                    autocomplete="on"
                />
            </el-form-item>

            <el-form-item prop="password">
                <span class="svg-container">
                    <i class="fas fa-lock"></i>
                </span>
                <el-input
                    :key="passwordType"
                    ref="password"
                    v-model="loginForm.password"
                    :type="passwordType"
                    placeholder="Password"
                    name="password"
                    tabindex="2"
                    autocomplete="on"
                    @keyup.enter="handleLogin"
                />
                <span class="show-pwd" @click="showPwd">
                    <i :class="{fas: true, 'fa-eye-slash': !pwOpened, 'fa-e
                    ye': pwOpened}"></i>
                </span>
            </el-form-item>

            <el-button
                :loading="loading"
                type="primary"
                style="width: 100%; margin-bottom: 30px"
                @click.prevent="login"
                >Login</el-button
            >
        </el-form>
    </div>
</template>

<script>
import apiManagers from '@/api/manager'

export default {
    data() {
        return {
            loginForm: {
                email: "",
                password: "",
            },
            pwOpened: false,
            passwordType: "password",
            loading: false,
        };
    },

    mounted() {
        this.$refs.email.focus();
    },

    methods: {
        showPwd() {
            this.pwOpened = ! this.pwOpened;
            if (this.pwOpened) {
                this.passwordType = "";
            } else {
                this.passwordType = "password";
            }
            this.$nextTick(() => {
                this.$refs.password.focus();
            });
        },
        login() {
            this.loading = true;
            apiManagers
                .signin(this.loginForm.email, this.loginForm.password)
                .then((response) => {
                    this.loading = false;

                    if (response.data.resultCode !== 0) {
                        this.$message.error(response.data.errorMsg);
                        return;
                    }

                    this.$router.push({path: "/"});
                })
                .catch((e) => {
                    console.log(e);
                });
        },
    },
};
</script>

<style lang="scss">
$bg: #283443;
$light_gray: #fff;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
    .login-container .el-input input {
        color: $cursor;
    }
}

/* reset element-ui css */
.login-container {
    .el-input {
        display: inline-block;
        height: 47px;
        width: 85%;
        input {
            background: transparent;
            border: 0px;
            -webkit-appearance: none;
            border-radius: 0px;
            padding: 12px 5px 12px 15px;
            color: $light_gray;
            height: 47px;
            caret-color: $cursor;
            &:-webkit-autofill {
                box-shadow: 0 0 0px 1000px $bg inset !important;
                -webkit-text-fill-color: $cursor !important;
            }
        }
    }
    .el-form-item {
        border: 1px solid rgba(255, 255, 255, 0.1);
        background: rgba(0, 0, 0, 0.1);
        border-radius: 5px;
        color: #454545;
    }
}
</style>

<style lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;

.login-container {
    min-height: 100%;
    width: 100%;
    background-color: $bg;
    overflow: hidden;
    .login-form {
        position: relative;
        width: 520px;
        max-width: 100%;
        padding: 160px 35px 0;
        margin: 0 auto;
        overflow: hidden;
    }
    .tips {
        font-size: 14px;
        color: #fff;
        margin-bottom: 10px;
        span {
            &:first-of-type {
                margin-right: 16px;
            }
        }
    }
    .svg-container {
        padding: 6px 5px 6px 15px;
        color: $dark_gray;
        vertical-align: middle;
        width: 30px;
        display: inline-block;
    }
    .title-container {
        position: relative;
        .title {
            font-size: 26px;
            color: $light_gray;
            margin: 0px auto 40px auto;
            text-align: center;
            font-weight: bold;
        }
    }
    .show-pwd {
        position: absolute;
        right: 10px;
        top: 7px;
        font-size: 16px;
        color: $dark_gray;
        cursor: pointer;
        user-select: none;
    }
    .thirdparty-button {
        position: absolute;
        right: 0;
        bottom: 6px;
    }
    @media only screen and (max-width: 470px) {
        .thirdparty-button {
            display: none;
        }
    }
}
</style>
```