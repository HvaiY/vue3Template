## Vue3+ts+Vite 后台管理项目

- 版本需求

  ```
  Node 16+版本
  pnpm  使用高性能npm(npm i pnpm)
  vite  用于创建项目(pnpm create vite)
  ```

- 项目配置
  - 移除style.css 默认样式，mian.ts 样式引入,清空App.vue组件代码，写上自己的代码
  - package.json 配置 自动打开浏览器

    ```
    "scripts": {
    "dev": "vite --open",
    ```

    之后尝试 `pnpm run dev`
  - eslint 配置（检查代码）
    - 安装eslint
     `pnpm i eslint -D`
    - 生成配置.eslintrc.cjs
     `npx eslint --init`
  - vue3环境代码校验插件
    - 安装指令 `pnpm install -D eslint-plugin-import eslint-plugin-vue eslint-plugin-node eslint-plugin-prettier eslint-config-prettier eslint-plugin-node @babel/eslint-parser`
    - 更新.eslintrc.cjs内容 增加部分校验规则 ，规则可见 eslint官网

    ``` js
      // @see <https://eslint.bootcss.com/docs/rules/>

      module.exports = {
        env: {
          browser: true,
          es2021: true,
          node: true,
          jest: true,
        },
        /*指定如何解析语法 */
        parser: 'vue-eslint-parser',
        /** 优先级低于 parse 的语法解析配置 */
        parserOptions: {
          ecmaVersion: 'latest',
          sourceType: 'module',
          parser: '@typescript-eslint/parser',
          jsxPragma: 'React',
          ecmaFeatures: {
            jsx: true,
          },
        },
        /* 继承已有的规则 */
        extends: [
          'eslint:recommended',
          'plugin:vue/vue3-essential',
          'plugin:@typescript-eslint/recommended',
          'plugin:prettier/recommended',
        ],
        plugins: ['vue', '@typescript-eslint'],
        /*

      - "off" 或 0    ==>  关闭规则
      - "warn" 或 1   ==>  打开的规则作为警告（不影响代码执行）
      - "error" 或 2  ==>  规则作为一个错误（代码不能执行，界面报错）
        */
        rules: {
          // eslint（<https://eslint.bootcss.com/docs/rules/）>
          'no-var': 'error', // 要求使用 let 或 const 而不是 var
          'no-multiple-empty-lines': ['warn', { max: 1 }], // 不允许多个空行
          'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
          'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
          'no-unexpected-multiline': 'error', // 禁止空余的多行
          'no-useless-escape': 'off', // 禁止不必要的转义字符

          // typeScript (https://typescript-eslint.io/rules)
          '@typescript-eslint/no-unused-vars': 'error', // 禁止定义未使用的变量
          '@typescript-eslint/prefer-ts-expect-error': 'error', // 禁止使用 @ts-ignore
          '@typescript-eslint/no-explicit-any': 'off', // 禁止使用 any 类型
          '@typescript-eslint/no-non-null-assertion': 'off',
          '@typescript-eslint/no-namespace': 'off', // 禁止使用自定义 TypeScript 模块和命名空间。
          '@typescript-eslint/semi': 'off',

          // eslint-plugin-vue (https://eslint.vuejs.org/rules/)
          'vue/multi-word-component-names': 'off', // 要求组件名称始终为 “-” 链接的单词
          'vue/script-setup-uses-vars': 'error', // 防止<script setup>使用的变量<template>被标记为未使用
          'vue/no-mutating-props': 'off', // 不允许组件 prop的改变
          'vue/attribute-hyphenation': 'off', // 对模板中的自定义组件强制执行属性命名样式
        },
      }
    ```

  - 增加 .eslintigonre 忽略校验文件

    ``` js
    dist
    node_modules
    ```

  - package.json新增两个运行脚本

    ``` js
      "scripts": {
          "lint": "eslint src",
          "fix": "eslint src --fix",
      }
    ```

  - 配置prettier（美化代码）
    - 安装依赖包

      ``` sh
      pnpm install -D eslint-plugin-prettier prettier eslint-config-prettier
      ```

    - .prettierrc.json(自己创建）添加规则

      ``` js
        {
          "singleQuote": true,
          "semi": false,
          "bracketSpacing": true,
          "htmlWhitespaceSensitivity": "ignore",
          "endOfLine": "auto",
          "trailingComma": "all",
          "tabWidth": 2
        }
      ```

    - .prettierignore

        ``` sh
          /dist/* 
          /html/*
          .local
          /node_modules/**
          **/*.svg
          **/*.sh
          /public/*
        ```

    - 配置stylelint

      ``` sh
      pnpm add sass sass-loader stylelint postcss postcss-scss postcss-html stylelint-config-prettier stylelint-config-recess-order stylelint-config-recommended-scss stylelint-config-standard stylelint-config-standard-vue stylelint-scss stylelint-order stylelint-config-standard-scss -D
      ```

    - .stylelintrc.cjs

      ``` js
      // @see https://stylelint.bootcss.com/

        module.exports = {
          extends: [
            'stylelint-config-standard', // 配置stylelint拓展插件
            'stylelint-config-html/vue', // 配置 vue 中 template 样式格式化
            'stylelint-config-standard-scss', // 配置stylelint scss插件
            'stylelint-config-recommended-vue/scss', // 配置 vue 中 scss 样式格式化
            'stylelint-config-recess-order', // 配置stylelint css属性书写顺序插件,
            'stylelint-config-prettier', // 配置stylelint和prettier兼容
          ],
          overrides: [
            {
              files: ['**/*.(scss|css|vue|html)'],
              customSyntax: 'postcss-scss',
            },
            {
              files: ['**/*.(html|vue)'],
              customSyntax: 'postcss-html',
            },
          ],
          ignoreFiles: [
            '**/*.js',
            '**/*.jsx',
            '**/*.tsx',
            '**/*.ts',
            '**/*.json',
            '**/*.md',
            '**/*.yaml',
          ],
          /**

        - null  => 关闭该规则
        - always => 必须
          */
          rules: {
            'value-keyword-case': null, // 在 css 中使用 v-bind，不报错
            'no-descending-specificity': null, // 禁止在具有较高优先级的选择器后出现被其覆盖的较低优先级的选择器
            'function-url-quotes': 'always', // 要求或禁止 URL 的引号 "always(必须加上引号)"|"never(没有引号)"
            'no-empty-source': null, // 关闭禁止空源码
            'selector-class-pattern': null, // 关闭强制选择器类名的格式
            'property-no-unknown': null, // 禁止未知的属性(true 为不允许)
            'block-opening-brace-space-before': 'always', //大括号之前必须有一个空格或不能有空白符
            'value-no-vendor-prefix': null, // 关闭 属性值前缀 --webkit-box
            'property-no-vendor-prefix': null, // 关闭 属性前缀 -webkit-mask
            'selector-pseudo-class-no-unknown': [
              // 不允许未知的选择器
              true,
              {
                ignorePseudoClasses: ['global', 'v-deep', 'deep'], // 忽略属性，修改element默认样式的时候能使用到
              },
            ],
          },
        }
      ```

    - .stylelintigonre

      ``` sh
        /node_modules/* 
        /dist/*
        /html/*
        /public/*
      ```

    - 运行脚本

      ``` js
        "scripts": {
          "lint:style": "stylelint src/**/*.{css,scss,vue} --cache --fix"
        },
        // 增加美化 格式化后的完整脚本
        "scripts": {
        "dev": "vite --open",
        "build": "vue-tsc && vite build",
        "preview": "vite preview",
        "lint": "eslint src",
        "fix": "eslint src --fix",
        "format": "prettier --write \"./**/*.{html,vue,ts,js,json,md}\"",
        "lint:eslint": "eslint src/**/*.{ts,vue} --cache --fix",
        "lint:style": "stylelint src/**/*.{css,scss,vue} --cache --fix"
      },
      ```

  - 配置husky（利用git hook运行 pnpm run format来自动的格式化我们的代码）
    - 安装 `pnpm install -D husky`
    - 增加git远程仓库(略)
    - 执行（需要先连接远程仓库）`npx husky-init`
      - 会在根目录下生成个一个.husky目录，在这个目录下面会有一个pre-commit文件，这个文件里面的命令在我们执行commit的时候就会执行
      在.husky/pre-commit文件添加如下命令：

      ``` sh
        #!/usr/bin/env sh
        . "$(dirname -- "$0")/_/husky.sh"
        pnpm run format
      ```

  - ~~配置commitlint（规范提交）~~
    - `pnpm add @commitlint/config-conventional @commitlint/cli -D`
  - ~~强制使用pnpm~~

- 项目集成
  -集成element-plus [官网地址](https://element-plus.gitee.io/zh-CN/)
  - `pnpm install element-plus @element-plus/icons-vue`
  - main.ts全局安装element-plus

    ``` js
    import ElementPlus from 'element-plus';
    import 'element-plus/dist/index.css'
    //@ts-expect-error 忽略当前文件ts类型的检测否则有红色提示(打包会失败)
      import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
      app.use(ElementPlus, {
        locale: zhCn
      })
    ```

  - Element Plus全局组件类型声明

    ``` json

    // tsconfig.json
    {
      "compilerOptions": {
        // ...
        "types": ["element-plus/global"]
      }
    }
    ```

  - src别名的配置

    ``` ts
    // vite.config.ts

    import {defineConfig} from 'vite'
    import vue from '@vitejs/plugin-vue'
    import path from 'path'
    export default defineConfig({
        plugins: [vue()],
        resolve: {
            alias: {
                "@": path.resolve("./src") // 相对路径别名配置，使用 @ 代替 src
            }
        }
    })
    ```

  - TypeScript 编译配置

    ``` json
    // tsconfig.json
    {
        "compilerOptions": {
          "baseUrl": "./", // 解析非相对模块的基地址，默认是当前目录
          "paths": { //路径映射，相对于baseUrl
            "@/*": ["src/*"]
          }
        }
      }
    ```

  - 环境变量配置

    ``` js
      项目开发过程中，至少会经历开发环境、测试环境和生产环境(即正式环境)三个阶段。不同阶段请求的状态(如接口地址等)不尽相同，若手动切换接口地址是相当繁琐且易出错的。于是环境变量配置的需求就应运而生，我们只需做简单的配置，把环境状态切换的工作交给代码。

      开发环境（development） 顾名思义，开发使用的环境，每位开发人员在自己的dev分支上干活，开发到一定程度，同事会合并代码，进行联调。
      测试环境（testing） 测试同事干活的环境啦，一般会由测试同事自己来部署，然后在此环境进行测试
      生产环境（production） 生产环境是指正式提供对外服务的，一般会关掉错误报告，打开错误日志。(正式提供给客户使用的环境。)
      注意:一般情况下，一个环境对应一台服务器,也有的公司开发与测试环境是一台服务器！！！
      项目根目录分别添加 开发、生产和测试环境的文件!
      .env.development
      .env.production
      .env.test
      文件内容

      # 变量必须以 VITE_ 为前缀才能暴露给外部读取

      NODE_ENV = 'development'
      VITE_APP_TITLE = '硅谷甄选运营平台'
      VITE_APP_BASE_API = '/dev-api'
      NODE_ENV = 'production'
      VITE_APP_TITLE = '硅谷甄选运营平台'
      VITE_APP_BASE_API = '/prod-api'

      # 变量必须以 VITE_ 为前缀才能暴露给外部读取

      NODE_ENV = 'test'
      VITE_APP_TITLE = '硅谷甄选运营平台'
      VITE_APP_BASE_API = '/test-api'
      配置运行命令：package.json
      "scripts": {
          "dev": "vite --open",
          "build:test": "vue-tsc && vite build --mode test",
          "build:pro": "vue-tsc && vite build --mode production",
          "preview": "vite preview"
        },
      通过import.meta.env获取环境变量
    ```

  - SVG图标配置(矢量图)
    - 安装依赖插件 `pnpm install vite-plugin-svg-icons -D`
    - 在vite.config.ts中配置插件

      ```js
      import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
      import path from 'path'
      export default () => {
        return {
          plugins: [
            createSvgIconsPlugin({
              // Specify the icon folder to be cached
              iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')],
              // Specify symbolId format
              symbolId: 'icon-[dir]-[name]',
            }),
          ],
        }
      }
      ```

    - 入口文件导入 `import 'virtual:svg-icons-register'`

    - svg封装为全局组件(多个模块使用)
      - 在src/components目录下创建一个SvgIcon.vue组件:代表如下

        ``` js
          <template>
            <div>
              <svg :style="{ width: width, height: height }">
                <use :xlink:href="prefix + name" :fill="color"></use>
              </svg>
            </div>

          </template>

          <script setup lang="ts">
          defineProps({
            //xlink:href属性值的前缀
            prefix: {
              type: String,
              default: '#icon-'
            },
            //svg矢量图的名字
            name: String,
            //svg图标的颜色
            color: {
              type: String,
              default: ""
            },
            //svg宽度
            width: {
              type: String,
              default: '16px'
            },
            //svg高度
            height: {
              type: String,
              default: '16px'
            }

          })
          </script>
          <style scoped></style>
        ```

      - 在components目录下创建一个index.ts文件,用于注册components文件夹内部全部全局组件！！！

        ```js
          import SvgIcon from './SvgIcon.vue'
          import type { App, Component } from 'vue'
          const components: { [name: string]: Component } = { SvgIcon }
          export default {
            install(app: App) {
              Object.keys(components).forEach((key: string) => {
                app.component(key, components[key])
              })
            },
          }

        ```

      - 在入口文件引入src/index.ts文件,通过app.use方法安装自定义插件

        ``` js
          import gloablComponent from './components/index';
          app.use(gloablComponent);
        ```  

  - 集成sass
    - `<style scoped lang="scss"></style>`

    ``` js
        接下来我们为项目添加一些全局的样式
        在src/styles目录下创建一个index.scss文件，当然项目中需要用到清除默认样式，因此在index.scss引入reset.scss（自行创建）
        @import 'reset.scss'
        在入口文件引入
        import '@/styles/index.scss'
        但是你会发现在src/styles/index.scss全局样式文件中没有办法使用变量.因此需要给项目中引入全局变量.
        在style/variable.scss创建一个variable.scss文件！
        在vite.config.ts文件配置如下:
        export default defineConfig((config) => {
            css: {
              preprocessorOptions: {
                scss: {
                  javascriptEnabled: true,
                  additionalData: '@import "./src/styles/variable.scss";',
                },
              },
            },
            }
        }
        @import "./src/styles/variable.less";后面的;不要忘记，不然会报错!
        配置完毕你会发现scss提供这些全局变量可以在组件样式中使用了！！！
    ```

  - mock 数据
    - 安装依赖
      - `pnpm install -D vite-plugin-mock mockjs`
      - 在 vite.config.js 配置文件启用插件。

        ``` js
          import { defineConfig } from 'vite'
          import { viteMockServe } from 'vite-plugin-mock'
          import vue from '@vitejs/plugin-vue'
          import path from 'path'
          import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'

          // <https://vitejs.dev/config/>
          export default defineConfig(({ command }) => {
            return {
              css: {
                preprocessorOptions: {
                  scss: {
                    javascriptEnabled: true,
                    additionalData: '@import "./src/styles/variable.scss";',
                  },
                },
              },
              plugins: [
                vue(),
                viteMockServe({
                  enable: command === 'serve',
                }),
        ```

      - 在根目录创建mock文件夹:去创建我们需要mock数据与接口！！！
        - 创建user.ts 用户接口

          ``` js
              //用户信息数据
              function createUserList() {
                  return [
                      {
                          userId: 1,
                          avatar:
                              'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
                          username: 'admin',
                          password: '111111',
                          desc: '平台管理员',
                          roles: ['平台管理员'],
                          buttons: ['cuser.detail'],
                          routes: ['home'],
                          token: 'Admin Token',
                      },
                      {
                          userId: 2,
                          avatar:
                              'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
                          username: 'system',
                          password: '111111',
                          desc: '系统管理员',
                          roles: ['系统管理员'],
                          buttons: ['cuser.detail', 'cuser.user'],
                          routes: ['home'],
                          token: 'System Token',
                      },
                  ]
              }

              export default [
                  // 用户登录接口
                  {
                      url: '/api/user/login',//请求地址
                      method: 'post',//请求方式
                      response: ({ body }) => {
                          //获取请求体携带过来的用户名与密码
                          const { username, password } = body;
                          //调用获取用户信息函数,用于判断是否有此用户
                          const checkUser = createUserList().find(
                              (item) => item.username === username && item.password === password,
                          )
                          //没有用户返回失败信息
                          if (!checkUser) {
                              return { code: 201, data: { message: '账号或者密码不正确' } }
                          }
                          //如果有返回成功信息
                          const { token } = checkUser
                          return { code: 200, data: { token } }
                      },
                  },
                  // 获取用户信息
                  {
                      url: '/api/user/info',
                      method: 'get',
                      response: (request) => {
                          //获取请求头携带token
                          const token = request.headers.token;
                          //查看用户信息是否包含有次token用户
                          const checkUser = createUserList().find((item) => item.token === token)
                          //没有返回失败的信息
                          if (!checkUser) {
                              return { code: 201, data: { message: '获取用户信息失败' } }
                          }
                          //如果有返回成功信息
                          return { code: 200, data: {checkUser} }
                      },
                  },
              ]
          ```

          - 备注：vite与vite-plugin-mock 不兼容处理[方案](https://juejin.cn/post/7252710159544483877)
  - 安装axios
    - `pnpm install axios`
    - axios 二次封装(拦截 响应拦截)
    - 在根目录下创建utils/request.ts

      ```ts
        import axios from "axios";
        import { ElMessage } from "element-plus";
        //创建axios实例
        let request = axios.create({
            baseURL: import.meta.env.VITE_APP_BASE_API,
            timeout: 5000
        })
        //请求拦截器
        request.interceptors.request.use(config => {
            return config;
        });
        //响应拦截器
        request.interceptors.response.use((response) => {
            return response.data;
        }, (error) => {
            //处理网络错误
            let msg = '';
            let status = error.response.status;
            switch (status) {
                case 401:
                    msg = "token过期";
                    break;
                case 403:
                    msg = '无权访问';
                    break;
                case 404:
                    msg = "请求地址错误";
                    break;
                case 500:
                    msg = "服务器出现问题";
                    break;
                default:
                    msg = "无网络";

            }
            ElMessage({
                type: 'error',
                message: msg
            })
            return Promise.reject(error);
        });
        export default request;
      ```

- API 统一接口管理
  - src 目录下增加api文件夹，增加user文件夹管理用户接口，index.ts和type.ts文件 配置请求接口

    ``` ts
    // index.ts
    //用户管理模块的接口
        import request from "@/utils/request";
        import type { UserResponseData, User, AllRoleResponseData, SetRoleData } from "./type";
        //枚举地址
        enum API {
            //获取全部已有用户账号信息
            ALLUSER_URL = '/admin/acl/user/',
            //添加一个新的用户账号
            ADDUSER_URL = "/admin/acl/user/save",
            //更新已有的用户账号
            UPDATEUSER_URL = '/admin/acl/user/update',
            //获取全部职位,当前账号拥有的职位接口
            ALLROLEURL = '/admin/acl/user/toAssign/',
            //给已有的用户分配角色接口
            SETROLE_URL = '/admin/acl/user/doAssignRole',
            //删除某一个账号
            DELETEUSER_URL = '/admin/acl/user/remove/',
            //批量删除的接口
            DELETEALLUSER_URL = '/admin/acl/user/batchRemove'

        }
        //获取用户账号信息的接口
        export const reqUserInfo = (page: number, limit: number, username: string) => request.get<any, UserResponseData>(API.ALLUSER_URL + `${page}/${limit}/?username=${username}`);
        //添加用户与更新已有用户的接口
        export const reqAddOrUpdateUser = (data: User) => {
            //携带参数有ID更新
            if (data.id) {
                return request.put<any, any>(API.UPDATEUSER_URL, data);
            } else {
                return request.post<any, any>(API.ADDUSER_URL, data);
            }
        }
        //获取全部职位以及包含当前用户的已有的职位
        export const reqAllRole = (userId: number) => request.get<any, AllRoleResponseData>(API.ALLROLEURL + userId);
        //分配职位
        export const reqSetUserRole = (data: SetRoleData) => request.post<any, any>(API.SETROLE_URL, data);
        //删除某一个账号的信息
        export const reqRemoveUser = (userId: number) => request.delete<any, any>(API.DELETEUSER_URL + userId);
        //批量删除的接口
        export const reqSelectUser = (idList: number[]) => request.delete(API.DELETEALLUSER_URL, { data: idList });

        // type.ts
        //账号信息的ts类型

            export interface ResponseData {
                code: number,
                message: string,
                ok: boolean
            }
            //代表一个账号信息的ts类型
            export interface User {
                id?: number,
                "createTime"?: string,
                "updateTime"?: string,
                "username"?: string,
                "password"?: string,
                "name"?: string,
                "phone"?: null,
                "roleName"?: string
            }
            //数组包含全部的用户信息
            export type Records = User[];
            //获取全部用户信息接口返回的数据ts类型
            export interface UserResponseData extends ResponseData {
                data: {
                    records: Records,
                    "total": number,
                    "size": number,
                    "current": number,
                    "pages": number
                }
            }

            //代表一个职位的ts类型
            export interface RoleData {
                "id"?: number,
                "createTime"?: string,
                "updateTime"?: string,
                "roleName": string,
                "remark": null
            }
            //全部职位的列表
            export type AllRole = RoleData[];
            //获取全部职位的接口返回的数据ts类型
            export interface AllRoleResponseData extends ResponseData {
                data: {
                    assignRoles: AllRole,
                    allRolesList: AllRole
                }
            }

            //给用户分配职位接口携带参数的ts类型
            export interface SetRoleData {
                "roleIdList": number[],
                "userId": number
            }
    ```
