export async function getModalsData(){
  const modals = await fetch("https://raw.githubusercontent.com/trombonist76/vue-task-management/main/src/assets/data/modals.json")
    .then(response => response.json())
    .then(response => response.modals)
  
  return modals
}

export async function getModalData(modalName){
  const modals = await getModalsData()
  const modal = modals.find(modal => modal.name === modalName)
  return modal
}