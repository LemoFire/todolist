<template>
  <div class="todo-footer">
    <label for="">
      <input type="checkbox" name="" id="" v-model="isCheckAll" />
    </label>
    <span>
      <span>已完成{{ count }}</span
      >/ 全部{{ todos.length }}
    </span>
    <button class="btn btn-danger" @click="pressDelCompleted">
      清除已完成任务
    </button>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import { Todo } from "../ts/todo";
export default defineComponent({
  name: "Footer",
  props: {
    todos: {
      type: Array as () => Todo[],
      required: true,
    },
    checkAll: {
      type: Function,
      required: true,
    },
    delCompleted: {
      type: Function,
      required: true,
    },
  },
  setup(props) {
    const count = computed(() => {
      return props.todos.reduce(
        (pre, todo, index) => pre + (todo.isCompleted ? 1 : 0),
        0
      );
    });
    const isCheckAll = computed({
      get() {
        return count.value > 0 && props.todos.length === count.value;
      },
      set(val) {
        console.log(val);
        props.checkAll(val);
      },
    });
    const pressDelCompleted = () => {
      console.log("pressDelCompleted");
      props.delCompleted();
    };
    return {
      count,
      isCheckAll,
      pressDelCompleted,
    };
  },
});
</script>

<style scoped>
.todo-footer {
  height: 40px;
  line-height: 40px;
  padding-left: 6px;
  margin-top: 5px;
}
.todo-footer label {
  display: inline-block;
  margin-right: 20px;
  cursor: pointer;
}
.todo-footer label input {
  position: relative;
  top: -1px;
  vertical-align: 5px;
  margin-right: 5px;
}
.todo-footer button {
  float: right;
  margin-top: 5px;
}
</style>