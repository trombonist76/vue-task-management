import { getBoardsData } from "@/services/boards";
export async function getBoards() {
  const boards = await getBoardsData()
  return boards;
}

export function delay(ms) {
  return new Promise((res) => setTimeout(res, ms));
}

export function createDescription(descriptionText, itemName){
  const description = descriptionText.replace('{itemName}', itemName)
  return description
}