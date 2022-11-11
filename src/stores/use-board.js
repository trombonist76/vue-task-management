import { defineStore } from "pinia";
import { getBoards } from "@/utils";

export const useBoardStore = defineStore("board", {
  state: () => ({
    boards: [],
    activeBoardId: 1,
  }),
  
  getters: {
    activeBoard: (state) => state.boards.find((board) => board.id === state.activeBoardId),
    boardFields(){ return Object.values(this.activeBoard.fields).map(field => field.status)},
    getAllTasks(){ return Object.values(this.activeBoard.fields).map(field => field.tasks).flat()} //[[task1,task2], [task1,task2]] so used flat()
  },

  actions: {
    async fetchBoards(){
      this.boards = await getBoards()
    },

    changeActiveBoard(board){
      this.activeBoardId = board.id
    },

    addNewTask(task){
      const field = Object.values(this.activeBoard.fields).find(field => field.status === task.status)
      field.tasks.push(task)
    }
  }


});
