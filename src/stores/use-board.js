import { defineStore } from "pinia";
import { getBoards } from "@/utils";

export const useBoardStore = defineStore("board", {
  state: () => ({
    boards: getBoards(),
    activeBoardId: 1,
  }),
  
  actions: {
    changeActiveBoard(board){
      this.activeBoardId = board.id
    },

    getActiveBoard(){
      return this.boards.find((board) => board.id === this.activeBoardId)
    },
  },

  getters: {
    activeBoard: (state) => state.getActiveBoard()}
});
