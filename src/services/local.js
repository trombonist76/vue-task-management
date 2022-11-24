export function saveThemeLocal( theme ){
  localStorage.setItem("theme", JSON.stringify(theme))
}

export function getThemeLocal(){
  const themeData = localStorage.getItem("theme")
  const theme =  JSON.parse(themeData)
  return theme
}