import { defineStore } from "pinia";
import { getBoards } from "@/utils";

export const useBoardStore = defineStore("board", {
  state: () => ({
    boards: getBoards(),
    activeBoardId: 1,
  }),
  
  getters: {
    activeBoard: (state) => state.boards.find((board) => board.id === state.activeBoardId),
    boardFields(){ return Object.values(this.activeBoard.fields).map(field => field.status) },
  },

  actions: {
    changeActiveBoard(board){
      this.activeBoardId = board.id
    },

    addNewTask(task){
      const field = Object.values(this.activeBoard.fields).find(field => field.status === task.status)
      field.tasks.push(task)
    }
  }


});
