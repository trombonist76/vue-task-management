export async function getBoardsData(){
  const boards = await fetch("./src/assets/data/boards.json")
    .then(response => response.json())
    .then(response => response.boards)
  
  return boards
}