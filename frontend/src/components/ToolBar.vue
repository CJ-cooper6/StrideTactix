<template>
    <div class="toolbar">
      <button @click="selectTool('line')">线段</button>
      <!-- 其他工具按钮 -->
    </div>
  </template>
  
  <script>
  export default {
    methods: {
      selectTool(tool) {
        this.$emit('select-tool', tool);
      }
    }
  };
  </script>
  
  <style>
  .toolbar {
    background: white;
    padding: 10px;
    border: 1px solid #ccc;
  }
  </style>