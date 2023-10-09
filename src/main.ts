import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
// 引入全局样式
import '@/styles/index.scss'

//@ts-expect-error 忽略当前文件ts类型的检测否则有红色提示(打包会失败)
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'

import gloablComponent from './components/index'

import App from './App.vue'

const app = createApp(App)
// 注册全部全局组件
app.use(gloablComponent)

app.use(ElementPlus, {
  locale: zhCn,
})

app.mount('#app')
