export function saveThemeLocal( theme ){
  localStorage.setItem("theme", JSON.stringify(theme))
}

export function getThemeLocal(){
  const themeData = localStorage.getItem("theme")
  const theme =  JSON.parse(themeData)
  return theme
}

export function saveActiveBoardId(id){
  localStorage.setItem("activeBoardId", JSON.stringify(id))
}

export function deleteActiveBoardId(){
  localStorage.removeItem("activeBoardId")
}

export function getActiveBoardId(){
  const activeIdData = localStorage.getItem("activeBoardId")
  const activeBoardId = JSON.parse(activeIdData)
  return activeBoardId
}

export function saveBoardsLocal(boards){
  localStorage.setItem("boards", JSON.stringify(boards))
}

export function getBoardsLocal(){
  const boardsData = localStorage.getItem("boards")
  const boards = JSON.parse(boardsData)
  return boards
}