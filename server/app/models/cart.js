module.exports = function Cart(oldCart){

    this.items = oldCart.items;
    this.totalQty = oldCart.totalQty;
    this.totalPrice = oldCart.totalPrice;

    this.add = function(item, id){

        //mark storedItem to items[id] for exist checking
        var storedItem = this.items[id];

        //if product new: add to cart
        if(!storedItem){

            //add: qty=0, price=0: increment on next step
            storedItem = this.items[id] = {item: item, qty: 0, price: 0};
        }       

        //if new qly=1, else qly++
        storedItem.qty++;
        storedItem.price = storedItem.item.price * storedItem.qty;
        this.totalQty++;
        this.totalPrice += storedItem.price;
    };

    this.generateArray = function(){
        var arr =[];
        for(var id in this.items){
            arr.push(this.items[id]);
        }
        return arr;
    }
};