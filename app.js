var model = {
	current: null,
	index: null,
	items: [
		new Item('old1', 'red', 10),
		new Item('old2', 'green', 9),
		new Item('old3', 'blue', 2)
	]
};

var controller = {
	init: function () {
		model.current = model.items[0];
		model.index = 0;
		model = (localStorage.model) ? JSON.parse(localStorage.model) : model;
		this.updateStorage();

		view.init();
		viewCurrent.init();
	},
	getAll: function () {
		return model = localStorage.model ? JSON.parse(localStorage.model) : [];
	},
	setCurrent: function (obj, index) {
		var li = document.querySelectorAll('.list li');
		index = (index < 0) ? 0 : index;

		model.current = obj;
		model.index = index;

		for (var i = 0; i < li.length; i++) {
			li[i].className = li[i].className.replace('current-item', '');
		}
		li[index].className = 'current-item';
	},
	updateStorage: function () {
		localStorage.model = JSON.stringify(model);
	},
	getCurrent: function () {
		return model.current;
	},
	addItem: function (obj) {
		model.items.push(obj);
		this.updateModel();
		this.setCurrent(obj, model.items.length - 1);
	},
	save: function(obj){
		model.items[model.index] = obj;
		this.updateModel();
		this.setCurrent(obj, model.index);
	},
	remove: function(){
		model.items.splice(model.index, 1);
		this.updateModel();
		this.setCurrent(model.items[model.index - 1], model.index - 1);
		this.updateViewCurrent();
	},
	updateModel: function(){
		this.updateStorage();
		view.render();
	},
	updateViewCurrent: function () {
		viewCurrent.render();
	}
};

var view = {
	init: function () {
		this.list = document.getElementsByClassName('list')[0];
		this.render();
		controller.setCurrent(model.items[0], 0);
	},
	render: function () {
		var items = controller.getAll().items;
		var elem = '';

		this.list.innerHTML = '';

		for (var i = 0; i < items.length; i++) {
			elem = document.createElement('li');
			elem.innerHTML = '<div class="item__name">' + items[i].name + '</div>' +
			'<div class="item__color">' + items[i].color + '</div>' +
			'<div class="item__count">' + items[i].count + '</div>';

			this.list.appendChild(elem);

			elem.addEventListener('click', (function (index) {
				return function () {
					controller.setCurrent(items[index], index);
					controller.updateViewCurrent();
				}
			})(i));
		}
	}
};

var viewCurrent = {
	init: function () {
		this.name = document.getElementById('item__name');
		this.color = document.getElementById('item__color');
		this.count = document.getElementById('item__count');
		this.red = document.getElementById('item__color--red');
		this.green = document.getElementById('item__color--green');
		this.blue = document.getElementById('item__color--blue');
		this.radio = document.querySelectorAll('input[name="color"]');
		this.color = null;

		this.saveBtn = document.getElementById('item__save');
		this.removeBtn = document.getElementById('item__remove');
		this.addBtn = document.getElementById('item__new');

		this.render();
		this.eventListeners();
	},
	render: function () {
		this.current = controller.getCurrent();

		this.name.value = this.current.name;
		this.count.value = this.current.count;

		if (this.current.color === 'red') {
			this.red.checked = true;
			this.color = 'red';
		}
		if (this.current.color === 'green') {
			this.green.checked = true;
			this.color = 'green';
		}
		if (this.current.color === 'blue') {
			this.blue.checked = true;
			this.color = 'blue';
		}
	},
	eventListeners: function () {
		var __this = this;

		for (var i = 0; i < this.radio.length; i++) {
			this.radio[i].addEventListener('click', function () {
				__this.color = this.value;
			});
		}

		this.saveBtn.addEventListener('click', function (e) {
			e.preventDefault();
			controller.save(this.getData());
		}.bind(this));

		this.removeBtn.addEventListener('click', function (e) {
			e.preventDefault();
			controller.remove();
		});

		this.addBtn.addEventListener('click', function (e) {
			e.preventDefault();
			controller.addItem(this.getData());
		}.bind(this));
	},
	getData: function () {
		return {
			name: this.name.value,
			color: this.color,
			count: this.count.value
		};
	}
};

controller.init();