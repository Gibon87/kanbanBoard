function Card(id, name) {

	var self = this;

	this.id = id;
	this.name = name || "Nie podano nazwy";
	this.$element = createCard();

	function createCard() {
		var $card = $("<li>").addClass("card"),
			$cardDescription = $("<p>").addClass("card-description").text(self.name),
			$cardDelete = $("<button>").addClass("btn-delete").text("x");

		$cardDelete.click(function(){
			self.removeCard();
		});

		$card.append($cardDelete)
			.append($cardDescription);
		
		return $card;
	}
}

Card.prototype.removeCard = function() {
	var self = this;
	$.ajax({
		url: baseUrl + "/card/" + self.id,
		method: "DELETE",
		success: function(){
			self.$element.remove();
		}
	});	
};
