import formValidatesMessages from "./formValidatesMessages"
export default{
    getErrorValidate(validator){
        const message = formValidatesMessages[validator]
        if (message) {
            return message
        } else{
            return formValidatesMessages.default
        }
    }
}
