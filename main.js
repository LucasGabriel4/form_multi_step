const form = document.querySelector('[data-js="form"]')
const formSteps = document.querySelectorAll('[data-js="form-step"]')
const steps = document.querySelectorAll('[data-js="step"]')
const inputWrapper = form.querySelector('[data-js="input__wrapper"]')
const inputs = [...inputWrapper.querySelectorAll('input')]




let currentStep = 0;
formSteps[currentStep].classList.add('active')


const showFormSteps = () => {
    formSteps.forEach((formStep) => {
        formStep.classList.remove('active')
    })

    formSteps[currentStep].classList.add('active')
}

const alternateSteps = () => {
     steps.forEach((step,index) => {
        step.classList.remove('active')
        step.classList.remove('done')
        
        if(index < currentStep + 1){
            step.classList.add('active')
        }

        if(index < currentStep){
            step.classList.add('done')
        }

     })
}





const navigateFormSteps = (event) => {
  const datasetBtn = event.target.dataset.btn;
  if(!event.target.matches('[data-btn]')){
    return
  }

  
 const [valueName, valueTelephone, valueEmail] = inputs.map((input) => input.value)
 const [inputName, inputTelephone, inputEmail] = inputs.map((input) => input)


 const navigateSteps = {
    next(){
      if(!validityFormStep()){
        return
      } 
      if (!validityFieldName(valueName, inputName)){
        return
      } 
      
      if (!validityFieldTelephone(valueTelephone, inputTelephone)){
        return
      } 
      
      if (!validityFieldEmail(valueEmail, inputEmail)){
        return
      }

      currentStep++
    },

    prev(){
      currentStep--
    }
 }


 navigateSteps[datasetBtn]()
 showFormSteps()
 alternateSteps()



}

alternateSteps()
form.addEventListener('click', navigateFormSteps)






const validityFormStep = () => {
  const currentFormStep = formSteps[currentStep];
   const formStepInputs = [...currentFormStep.querySelectorAll('[data-js="form-step"] input'),
  ...currentFormStep.querySelectorAll('[data-js="form-step"] textarea')] 
  return formStepInputs.every((input) => input.reportValidity())

}

validityFormStep()


const applyInvalidField = (input) => {
   input.style.border = '1px solid red';
}

const resetInvalidField = (input) => {
   input.style.border = '1px solid #e1e1e6'
}

const validityFieldName = (valueInput, input) => {
  let isValid = true;
  const amountNames = valueInput.split(' ').length;
  const names = valueInput.split(' ');
  if(amountNames === 4){
     names.forEach((name) => {
       if(name.match(/^([A-Z]+[a-z]+)/g)){
         resetInvalidField(input)
       }else{
         applyInvalidField(input)
         isValid = false
       }
     })
  }else{
    applyInvalidField(input)
    isValid = false
  }

  return isValid
}


const validityFieldTelephone = (valueInput, input) => {
  let isValid = true
  if(valueInput.match(/(\(\d{2}\))(\d{5}\-)(\d{4})/g)){
    resetInvalidField(input)
  }else{
    applyInvalidField(input)
    isValid = false
  }
 return isValid
}



const validityFieldEmail = (valueInput, input) => {
  let isValid = true;
  if(valueInput.match(/(^[a-z][a-z_?.?]+\d+)(\@[a-z]+\.[a-z]+)/g)){
    resetInvalidField(input)
  }else{
    applyInvalidField(input)
    isValid = false;
  }
  return isValid;
}




const validityInputsForm = (event) => {
   const valueInput = event.target.value;
   const input = event.target;
  if(input.name === 'nome'){
       validityFieldName(valueInput, input)
  }

  if(input.name === 'telefone'){
       validityFieldTelephone(valueInput, input)
  }

  if(input.name === 'email'){
     validityFieldEmail(valueInput, input)
  }

   
}



form.addEventListener('input', (event) => {
  validityInputsForm(event)
})




form.addEventListener('submit', (event) => {
  event.preventDefault();

  const data = new FormData(form)
  alert(`Obrigado ${data.get('nome')}!`)
})






