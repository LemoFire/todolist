<template>
  <li
    @mouseenter="mouseHandler(true)"
    @mouseleave="mouseHandler(false)"
    :style="{ backgroundColor: bgColor, color: myColor }"
  >
    <label for="">
      <input type="checkbox" name="" id="" v-model="isComplete" />
      <span>{{ todo.title }}</span>
    </label>
    <button class="btn btn-danger" v-show="isShow" @click="delItem">
      删除
    </button>
  </li>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from "vue";
import { Todo } from "../ts/todo";
export default defineComponent({
  name: "Item",
  props: {
    todo: {
      type: Object as () => Todo,
      required: true,
    },
    delTodo: {
      type: Function,
      required: true,
    },
    index: {
      type: Number,
      required: true,
    },
    updateTodo: {
      type: Function,
      required: true,
    },
  },
  setup(props) {
    const bgColor = ref("green");
    const myColor = ref("red");
    const isShow = ref(false);
    const mouseHandler = (flag: boolean) => {
      if (flag) {
        bgColor.value = "pink";
        myColor.value = "red";
        isShow.value = true;
      } else {
        bgColor.value = "blue";
        myColor.value = "white";
        isShow.value = false;
      }
    };
    const delItem = () => {
      if (window.confirm("确定要删除吗？")) {
        console.log(props.index);
        props.delTodo(props.index);
      }
    };
    const isComplete = computed({
      get() {
        return props.todo.isCompleted;
      },
      set(val) {
        props.updateTodo(props.todo, val);
      },
    });
    return {
      mouseHandler,
      bgColor,
      myColor,
      isShow,
      delItem,
      isComplete,
    };
  },
});
</script>

<style scoped>
li {
  list-style: none;
  height: 36px;
  line-height: 36px;
  padding: 0 5px;
  border-bottom: 1px solid #ddd;
}

li lable {
  float: left;
  cursor: pointer;
}
li label li input {
  vertical-align: middle;
  margin-right: 6px;
  position: relative;
  top: 1px;
}

li button {
  float: right;
  margin-top: 3px;
}

li:before {
  content: initial;
}
li:last-child {
  border-bottom: none;
}
</style>
