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
    }
  },

  getters: {
    activeBoard: (state) =>
      state.boards.find((board) => board.id === state.activeBoardId),
  },
});
