import modalsData from "@/assets/data/modals.json"

export function getModalData(modalName){
  const modals = modalsData.modals
  const modal = modals.find(modal => modal.name === modalName)
  return modal
}