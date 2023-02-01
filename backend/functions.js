function getSolarValue() { 
    fetch('https://solvann.azurewebsites.net/api/Solar/')
    .then(res => res.json())
    .then(data => console.log(data));
}



function getPowerPrice(){ 
    fetch('https://solvann.azurewebsites.net/api/PowerPrice')
    .then(res => res.json())
    .then(data => console.log(data));
}




export { getSolarValue }; 
export { getPowerPrice };
