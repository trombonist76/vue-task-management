export async function getBoardsData(){
  const boards = await fetch("https://raw.githubusercontent.com/trombonist76/vue-task-management/main/src/assets/data/boards.json")
    .then(response => response.json())
    .then(response => response.boards)
  
  return boards
}