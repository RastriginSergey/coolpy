function Item(name, color, count) {
    this.name = name;
    this.color = color;
    this.count = count;
    this.save = function() {
        alert(1);
    }
}

var model = {
    current: null,
    index: null,
    // TODO items hasn't methods, check why?
    items: items
};


var controller = {
    init: function() {
        model.current = model.items[0];
        model.index = 0;
        this.updateStorage();

        view.init();
        viewCurrent.init();
    },
    getAll: function() {
        return model = localStorage.model ? JSON.parse( localStorage.model ) : [];
    },
    setCurrent: function(obj, index) {
        model.current = obj;
        model.index = index;

        this.updateStorage();
    },
    updateStorage: function() {
        localStorage.model = JSON.stringify( model );
    },
    getCurrent: function() {
        return model.current;
    },
    addNew: function(obj){
        model.items.push(obj);
        view.render();
    }
};

var view = {
    init: function() {
        this.list = document.getElementsByClassName( 'list' )[0];
        this.render();
    },

    render: function() {
        var items = controller.getAll().items;
        var elem = '';

        for ( var i = 0; i < items.length; i++ ) {
            elem = document.createElement('li');
            elem.innerHTML = '<div class="item__name">' + items[ i ].name + '</div>' +
                    '<div class="item__color">' + items[ i ].color + '</div>' +
                    '<div class="item__count">' + items[ i ].count + '</div>';

            this.list.appendChild(elem);

            elem.addEventListener( 'click', (function( index ) {
                return function(){
                    controller.setCurrent(items[index], index);
                    viewCurrent.render();
                }
            })(i));

            elem = '';
        }
    }
};

var viewCurrent = {
    init: function() {
        this.name = document.getElementById( 'item__name' );
        this.color = document.getElementById( 'item__color' );
        this.count = document.getElementById( 'item__count' );
        this.red = document.getElementById( 'item__color--red' );
        this.green = document.getElementById( 'item__color--green' );
        this.blue = document.getElementById( 'item__color--blue' );
        this.save = document.getElementById( 'item__save' );
        this.remove = document.getElementById( 'item__remove' );
        this.new = document.getElementById( 'item__new' );

        this.render();
    },
    render: function() {
        this.current = controller.getCurrent();

        this.name.value = this.current.name;
        this.count.value = this.current.count;

        if ( this.current.color === 'red' ) {
            this.red.checked = true;
        }
        if ( this.current.color === 'green' ) {
            this.green.checked = true;
        }
        if ( this.current.color === 'blue' ) {
            this.blue.checked = true;
        }
    }
};

controller.init();
