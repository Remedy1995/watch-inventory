const wholeSaleRemainingStock=(quantitySold,quantityPerBox,Allstocks)=>{
    //returns the remaining of stocks when wholesale is made 
    let stocksSold = quantitySold * quantityPerBox;
    let remainingStocks = Allstocks - stocksSold;
    return remainingStocks;
}
module.exports=wholeSaleRemainingStock;