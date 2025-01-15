<template>
    <div class="markdown-editor-box" style="width: 100%; height: 400px;">
      <link rel="stylesheet" href="./editor.md-master/css/editormd.min.css">
      <div :id="editorId">
        <textarea :value="defaultValue"></textarea>
      </div>
    </div>
  </template>
  
  <script>
  import scriptjs from 'scriptjs'
  import { defaultConfig } from '@/config/MarkdownConfig';
  import { EditorConfig } from '@/plugins/editor.js';
  
  export default {
    name: 'MarkdownEditor',
    props: {
      editorId: {
        type: String,
        default: 'markdown-editor',
        required: true
      },
      defaultValue: {
        type: String,
        default: ''
      },
      onchange: {
        type: Function
      },
      config: {
        type: Object
      },
      initData: {
        type: String,
      },
      initDataDelay: {
        type: Number,
        default: 0
      }
    },
    data () {
      return {
        editor: null,
        editorLoaded: false
      }
    },
    methods: {
      fetchScript (url) {
        return new Promise(resolve => {
          scriptjs(url, () => {
            resolve()
          })
        })
      },
      getConfig () {
        return {
          ...defaultConfig, 
          ...this.config,
          value: this.defaultValue, // 添加默认值
          onload: () => {
            this.$nextTick(() => {
              // 在编辑器加载完成后，为textarea添加属性
              const textarea = document.querySelector('.editormd-html-textarea')
              if (textarea) {
                textarea.value = this.defaultValue // 确保 textarea 有值
                textarea.setAttribute('title', 'Markdown Editor')
                textarea.setAttribute('aria-label', 'Markdown Editor')
              }
            })
          }
        }
        // return { ...EditorConfig, ...this.config }
      },
      getEditor () {
        return this.editor
      },
      getDoc () {
        return this.doc
      },
      watch () {
        return this.editor.watch()
      },
      unwatch () {
        return this.editor.unwatch()
      },
      previewing () {
        return this.editor.previewing()
      },
      getHTML () {
        return this.editor.getHTML()
      },
      getMarkdown () {
        return this.editor.getMarkdown()
      },
      setMarkdown (markdown) {
        return this.editor.setMarkdown(markdown)
      },
      initEditor () {
        (async () => {
          // await this.fetchScript('./editor.md-master/jquery-1.10.2.min.js')
            await this.fetchScript('../../node_modules/jquery/dist/jquery.min.js')
            await this.fetchScript('/editor.md-master/editormd.min.js')
          this.$nextTick(() => {
            const editor = window.editormd(this.editorId, this.getConfig())
            console.log('init editor ', editor)
            editor.on('load', () => {
              setTimeout(() => {
                this.editorLoaded = true
                this.initData && editor.setMarkdown(this.initData)
              }, this.initDataDelay)
            })
            this.onchange && editor.on('change', () => {
              const html = editor.getPreviewedHTML()
              this.onchange({
                markdown: editor.getMarkdown(),
                html: html,
                text: window.$(html).text()
              })
            })
            this.editor = editor
          })
        })()
      }
    },
    mounted () {
      this.initEditor()
    },
    watch: {
      initData: function (newVal) {
        if (newVal) {
          this.editorLoaded && this.editor.setMarkdown(newVal)
        }
      }
    }
  }
  </script>
  
  <style scoped lang="less">
  
  </style>
  
  