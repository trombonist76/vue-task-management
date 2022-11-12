import { defineStore } from "pinia";
import { getBoards } from "@/utils";

export const useBoardStore = defineStore("board", {
  state: () => ({
    boards: [],
    activeBoardId: null,
  }),
  
  getters: {
    activeBoard: (state) => state.boards.find((board) => state.activeBoardId ? board.id === state.activeBoardId : state.boards.at(0).id),
    boardsWithoutActiveBoard(state){return state.boards.filter(board => board.id !== this.activeBoard.id)},
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
    },

    deleteBoard(){
      const boardIndex = this.boards.findIndex(board => board.id === this.activeBoard.id)
      this.boards.splice(boardIndex, 1)
    }
  }


});
