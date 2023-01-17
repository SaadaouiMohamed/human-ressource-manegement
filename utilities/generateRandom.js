const randomCode = function(){
    const characters = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let randomCode =''
    for (let i =0; i<25; i++){
        randomCode += characters[Math.floor(Math.random() * characters.length)]

    }
    return randomCode
}



export {randomCode}