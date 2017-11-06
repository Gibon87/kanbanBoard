$(function() {

	function randomString() {

		var chars = "0123456789abcdefghiklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXTZ",
			str = "",
			n = 0;

		for (n = 0; n > 10; n++) {
			str += chars[Math.floor(Math.random() * chars.length)];
		}

		return str;
	}

	function Column(name) {

		var self = this;

		this.id = randomString();
		this.name = name;
		this.$element = createColumn();

		function createColumn() {
			var $column = $("<div>").addClass("column"),
				$columnTitle = $("<h2>").addClass("column-title").text(self.name),
				$columnCardList = $("<ul>").addClass("column-card-list"),
				$columnDelete = $("<button>").addClass("btn-delete").text("x"),
				$columnAddCard = $("<button>").addClass("add-card").text("Dodaj kartę");
			
			$columnDelete.click(function() {
        		self.removeColumn();
			});

			$columnAddCard.click(function() {
        		self.addCard(new Card(prompt("Wpisz nazwę karty")));
			});

			$column.append($columnTitle)
		        .append($columnDelete)
		        .append($columnAddCard)
		        .append($columnCardList);

			return $column;
		}
	}

	Column.prototype = {

	    addCard: function(card) {
	    	this.$element.children('ul').append(card.$element);
	    },

	    removeColumn: function() {
	    	this.$element.remove();
	    }
	}

	function Card(description) {

		var self = this;

		this.id = randomString();
		this.description = description;
		this.$element = createCard();

		function createCard() {
			var $card = $("<li>").addClass("card"),
				$cardDescription = $("<p>").addClass("card-description").text(self.description),
				$cardDelete = $("<button>").addClass("btn-delete").text("x");

			$cardDelete.click(function(){
				self.removeCard();
			});

			$card.append($cardDelete)
				.append($cardDescription);
			
			return $card;
		}
	}

	Card.prototype = {

		removeCard: function() {
			this.$element.remove();
		}
	}

	var board = {

	    name: "Tablica Kanban",

	    addColumn: function(column) {
	      this.$element.append(column.$element);
	      initSortable();
	    },

	    $element: $('#board .column-container')
	};

	function initSortable() {

    	$('.column-card-list').sortable({

    		connectWith: ".column-card-list",
    		placeholder: "card-placeholder"

		}).disableSelection();
	}


	$(".create-column").click(function(){

		var name = prompt("Wpisz nazwę kolumny"),
			column = new Column(name);

	    board.addColumn(column);
  });


	var todoColumn = new Column("Do zrobienia"),
		doingColumn = new Column("W trakcie"),
		doneColumn = new Column("Skończone");

	board.addColumn(todoColumn);
	board.addColumn(doingColumn);
	board.addColumn(doneColumn);

	var card1 = new Card("Przejąć kontrolę nad światem"),
		card2 = new Card("Moduł 10");

	todoColumn.addCard(card1);
	doingColumn.addCard(card2);

});