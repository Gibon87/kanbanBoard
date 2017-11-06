function Column(id, name){

	var self = this;

	this.id = id;
	this.name = name || "Nie podano nazwy";
	this.$element = createColumn();

	function createColumn() {
		var $column = $("<div>").addClass("column"),
			$columnTitle = $("<h2>").addClass("column-title").text(self.name),
			$columnCardList = $("<ul>").addClass("column-card-list"),
			$columnDelete = $("<button>").addClass("btn-delete").text("x"),
			$columnAddCard = $("<button>").addClass("add-card").text("Dodaj kartę"),
			$columnChangeName = $("<button>").addClass("change-name").text("Zmień nazwę");
		
		$columnDelete.click(function() {
    		self.removeColumn();
		});

		$columnChangeName.click(function() {
			var newColumnName = prompt("Wpisz nową nazwę");
			self.changeName(newColumnName);
		});

		$columnAddCard.click(function() {
			var cardName= prompt("Wpisz nazwę karty");
			event.preventDefault();
			$.ajax({
				url: baseUrl + "/card",
				method: "POST",
				data: {
				name: cardName,
	    		bootcamp_kanban_column_id: self.id
				},
				success: function(response){
					var card = new Card(response.id, cardName);
        			self.addCard(card);
				}
			});   		
		});

		$column.append($columnTitle)
			.append($columnChangeName)
	        .append($columnDelete)
	        .append($columnAddCard)
	        .append($columnCardList);        

		return $column;
	}
}

Column.prototype.addCard = function(card){
    this.$element.children("ul").append(card.$element);
};

Column.prototype.removeColumn = function(){
	var self = this;
	$.ajax({
		url: baseUrl + "/column/" + self.id,
		method: "DELETE",
		success: function(response){
			self.$element.remove();
		}
	});
};

Column.prototype.changeName = function(newName){
	var self = this;
	$.ajax({
		url: baseUrl + "/column/" + self.id,
		method: "PUT",
		data: {
		id: self.id,
		name: newName
		},
		success: function(){
			self.name = newName;	
			self.$element.find(".column-title").text(self.name);
		}
	});
}