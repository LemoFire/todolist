<template>
  <div class="todo-container">
    <div class="todo-wrap">
      <Header :addTodo="addTodo" />
      <List :todos="todos" :delTodo="delTodo" :updateTodo="updateTodo" />
      <Footer
        :todos="todos"
        :checkAll="checkAll"
        :delCompleted="delCompleted"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, watch, onMounted } from "vue";
import Header from "@/components/Header.vue";
import List from "@/components/List.vue";
import Footer from "@/components/Footer.vue";
import { Todo } from "@/ts/todo";
import { saveTodos, loadTodos } from "@/utils/localStorage";

export default defineComponent({
  name: "App",
  components: {
    Header,
    List,
    Footer,
  },
  setup() {
    // const state = reactive<{ todos: Todo[] }>({
    //   todos: [
    //     { id: 1, title: "benz1", isCompleted: false },
    //     { id: 2, title: "benz2", isCompleted: true },
    //     { id: 3, title: "benz3", isCompleted: false },
    //   ],
    // });
    const state = reactive<{ todos: Todo[] }>({
      todos: [],
    });
    onMounted(() => {
      setTimeout(() => {
        state.todos = loadTodos();
      }, 1000);
    });
    const addTodo = (todo: Todo) => {
      state.todos.unshift(todo);
    };
    const delTodo = (index: number) => {
      state.todos.splice(index, 1);
    };
    const updateTodo = (todo: Todo, isCompleted: boolean) => {
      todo.isCompleted = isCompleted;
      console.log(todo);
    };
    const checkAll = (isCompleted: boolean) => {
      state.todos.forEach((todo) => {
        todo.isCompleted = isCompleted;
      });
    };
    const delCompleted = () => {
      state.todos.forEach((todo) => {
        state.todos = state.todos.filter((todo) => !todo.isCompleted);
      });
    };

    // watch(
    //   () => state.todos,
    //   (value) => {
    //     localStorage.setItem("todos_key", JSON.stringify(value));
    //   },
    //   { deep: true }
    // );
    watch(() => state.todos, saveTodos, { deep: true });
    return {
      ...toRefs(state),
      addTodo,
      delTodo,
      updateTodo,
      checkAll,
      delCompleted,
    };
  },
});
</script>

<style scoped>
.todo-container {
  width: 600px;
  margin: 0 auto;
  padding: 5px;
  background-color: aqua;
}
.todo-container .todo-wrap {
  border: 3px solid #ddd;
  border-radius: 5px;
}
</style>
