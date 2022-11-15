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

    editBoard(editedBoard){
      const boardIndex = this.boards.findIndex(board => board.id === editedBoard.id)
      this.boards[boardIndex] = editedBoard
    },

    deleteBoard(){
      const boardIndex = this.boards.findIndex(board => board.id === this.activeBoard.id)
      this.boards.splice(boardIndex, 1)
    },
    
    getTask(taskTitle){
      const task =  this.activeBoardTasks.find(task => task.title === taskTitle)
      return task
    },

    getTaskField(taskTitle){
      const field = this.activeBoard.fields.find(field => field.tasks.some(task => task.title === taskTitle))
      return field
    },

    addNewTask(task){
      const field = Object.values(this.activeBoard.fields).find(field => field.name === task.status)
      delete task.status
      field.tasks.push(task)
    },

    changeTaskField(oldFieldName ,newFieldName, taskTitle){
      const oldField = this.getField(oldFieldName)
      const newField = this.getField(newFieldName)
      const task = this.getTask(taskTitle)
      oldField.tasks = oldField.tasks.filter(task => task.title !== taskTitle)
      newField.tasks = [...newField.tasks, task]
    },

    editTask(editedTask, originalTitle){
      const taskField = this.getTaskField(originalTitle)
      const taskIndex = taskField.tasks.findIndex(task => task.title === originalTitle)
      taskField.tasks[taskIndex] = { ...editedTask }

      if(editedTask.status === taskField.name) return
      this.changeTaskField(taskField.name, editedTask.status, editedTask.title)
    },

    getField(fieldName){
      const field = this.activeBoard.fields.find(field => field.name === fieldName)
      return field
    },

    getFieldTasks(fieldName){
      const field = this.getField(fieldName)
      return field.tasks
    }
  }
});
