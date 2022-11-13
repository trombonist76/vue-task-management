import { nanoid } from "nanoid"

export function getInitialCreateTaskForm(){

  const form = {
    title: {
      value: "",
      isValid: false
    },
  
    description: {
      value: "",
      isValid: true
    },
  
    status: {
      value: "",
      isValid: false
    },
  
    subtasks: [
      {
        id: nanoid(),
        value: "",
        isCompleted: false,
        isValid: false
      },
    ]
  }

  return form
}

export function formToData(form){
  //clone the obj because delete isValid property
  //if we dont do that it will change original reference
  const copiedForm = JSON.parse(JSON.stringify(form))  
  const data = Object.entries(copiedForm).reduce((dataObj, [formField, formValue]) => {

    if (formValue.hasOwnProperty("value")){
      dataObj[formField] = formValue.value
      return dataObj
    }

    const itemsInArray = formValue.map((item) => {
      delete item.isValid
      return item
    })

    dataObj[formField] = itemsInArray

    return dataObj
  }, {})

  return data
}

export function validateForm(form){
  const data = Object.entries(form).reduce((dataObj, [formField, formValue]) => {

    if (formValue.hasOwnProperty("value")){
      dataObj[formField] = formValue.isValid
      return dataObj
    }

    const checkAllValid = formValue.every((item) => item.isValid)

    dataObj[formField] = checkAllValid

    return dataObj
  }, {})

  return data
}