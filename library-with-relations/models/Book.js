const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bookSchema = new Schema({
	title: String,
	description: String,
	author: {
		type: Schema.Types.ObjectId,
		// this refers to the model the id above belongs to
		ref: 'Author'
	},
	rating: Number,
	reviews: [{
		user: String,
		text: String
	}]
});

const Book = mongoose.model('Book', bookSchema);
module.exports = Book;
