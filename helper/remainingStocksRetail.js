const retailRemainingStock=(quantity,quantitySold)=>{
    let convertStock= (quantitySold)/10;
    let remainingStock = quantity - convertStock ;
    return remainingStock;

}
module.exports = retailRemainingStock;