const genrateInitalValues = (inputArr)=>{
    let initalValues = {}
    inputArr.forEach(element => {
        if (element.value != "" && !element.value){
            initalValues[element.name] = ""
        }
        else{
            initalValues[element.name] = element.value
        }
    });
    return initalValues;
}

export default genrateInitalValues;