<script>
import Board from './Board.vue';
  export default {
    inject: ["boards", "changeTabIndex","activeTabIndex"],
    components: { Board }
}
</script>
<template>
    <ul>
      <Board @click="changeTabIndex(board.id)" v-for="(board,index) in boards" :key="index" :board="board"/>
    </ul>
</template>