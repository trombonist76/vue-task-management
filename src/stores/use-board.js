import { defineStore } from "pinia";
import { getBoards } from "@/utils";

export const useBoardStore = defineStore("board", {
  state: () => ({
    boards: [],
    activeBoardId: 1,
  }),
  
  getters: {
    activeBoard: (state) => state.boards.find((board) => board.id === state.activeBoardId),
    boardsWithoutActiveBoard: (state) => state.boards.filter(board => board.id !== state.activeBoardId),
    activeBoardFields(){ return this.activeBoard.fields.map(field => field.name)},
    activeBoardTasks(){ return this.activeBoard.fields.map(field => field.tasks).flat()} //[[task1,task2], [task1,task2]] so used flat()
  },

  actions: {
    async fetchBoards(){
      this.boards = await getBoards()
    },

    changeActiveBoard(board){
      this.activeBoardId = board.id
    },

    addNewTask(task){
      const field = Object.values(this.activeBoard.fields).find(field => field.name === task.status)
      field.tasks.push(task)
    },

    editBoard(editedBoard){
      const boardIndex = this.boards.findIndex(board => board.id === editedBoard.id)
      this.boards[boardIndex] = editedBoard
    }
  }


});
