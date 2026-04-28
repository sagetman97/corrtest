//demo app
//import this first, so that demo styles get imported after.
import { createApp } from 'vue'

import PollyComponents from '@/main'
import App from './App.vue'
import { CodeSnippet, ComponentBasePage, ComponentDemoLayout, ComponentExample, SectionHeader } from './components'
import router from './router'

import('./styles/main.css')

const app = createApp(App)

app.use(PollyComponents)
app.component('ComponentDemoLayout', ComponentDemoLayout)
app.component('ComponentBasePage', ComponentBasePage)
app.component('CodeSnippet', CodeSnippet)
app.component('ComponentExample', ComponentExample)
app.component('SectionHeader', SectionHeader)
app.use(router)

app.mount('#app')
