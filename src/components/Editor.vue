<template>
    <div :id="editorId"></div>
</template>
  
  <script>
  import { onMounted, ref, watch } from "vue";
  
  export default {
    name: "Editor",
    props: {
      modelValue: {
        type: String,
        default: "",
      },
      editorOptions: {
        type: Object,
        default: () => ({}),
      },
      editorId: {
        type: String,
        default: "editorId", 
      }
    },
    emits: ["update:modelValue"],
    setup(props, { emit }) {
    //   const editorId = ref(`editor_${Math.random().toString(36).substr(2, 9)}`);
      const editorId = ref(`${props.editorId}`);
      let editorInstance = null;
  
      const initEditor = async () => {
        try {
          const { $initEditor, $editorConfig } = window.app.config.globalProperties;
          editorInstance = await $initEditor(editorId.value, {
            ...$editorConfig.DEFAULT_OPTIONS,
            ...props.editorOptions,
            onload: function () {
              // 同步初始内容
              this.setMarkdown(props.modelValue || "");
            },
            onchange: function () {
              // 更新父组件的响应式数据
              emit("update:modelValue", this.getMarkdown());
            },
          });
        } catch (error) {
          console.error("Editor initialization failed:", error);
        }
      };
  
      onMounted(() => {
        initEditor();
      });
  
      watch(
        () => props.modelValue,
        (newVal) => {
          if (editorInstance && newVal !== editorInstance.getMarkdown()) {
            editorInstance.setMarkdown(newVal);
          }
        }
      );
  
      return {
        editorId,
      };
    },
  };
  </script>
  
  <style scoped>
  /* 可根据需要自定义样式 */
  </style>
  