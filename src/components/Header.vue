<template>
  <div class="todo-header">
    <input
      type="text"
      name=""
      id=""
      placeholder="输入任务"
      v-model="title"
      @keyup.enter="add"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "Header",
  setup(props) {
    const title = ref("");
    const add = () => {
      const text = title.value;
      if (!text.trim()) return;
      const todo = {
        id: Date.now(),
        title: text,
        isCompleted: false,
      };
      props.addTodo(todo);
      title.value = "";
    };
    return {
      add,
      title,
    };
  },
  props: {
    addTodo: {
      type: Function,
      required: true,
    },
  },
});
</script>

<style scoped>
.todo-header input {
  width: 560px;
  height: 28px;
  font-size: 14px;
  border: 1px solid #cccccc;
  border-radius: 4px;
  padding: 4px 7px;
}
.todo-header input:focus {
  outline: none;
  border-color: rgba(82, 168, 236, 0.8);
  box-shadow: inset 0 1px 1px;
}
</style>
