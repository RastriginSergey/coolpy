function Item(name, color, count) {
    this.name = name;
    this.color = color;
    this.count = count;
}

Item.prototype = {
    save: function() {
        alert(1);
    }
};