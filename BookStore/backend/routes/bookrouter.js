import express from "express";
import { Book } from "../models/bookModel.js";

const router = express.Router();

// Route for Save a new Book in Database
router.post('/', async (request, response) => {
    try {
      if (
        !request.body.title ||
        !request.body.author ||
        !request.body.publishYear
      ) {
        return response.status(400).send({
          message: 'Send all required fields: title, author, publishYear',
        });
      }
      const newBook = {
        title: request.body.title,
        author: request.body.author,
        publishYear: request.body.publishYear,
      };
  
      const book = await Book.create(newBook);
  
      return response.status(201).send(book);
    } catch (error) {
      console.log(error.message);
      response.status(500).send({ message: error.message });
    }
  });


  // Route to get all books
router.get('/', async (request, response) => {
    try{
        const books = await Book.find({});
        return response.status(200).json({
            count: books.length,
            data: books
        });
    }catch(error){
        console.log(error.message);
        response.status(500).send({message: error.message});
    }
});


// Route to get a book by Id
router.get('/:id', async(request, response) => {
    try {
        const { id } = request.params;

        const book = await Book.findById(id);

        return response.status(200).json(book);
    }catch (error) {
        console.log(error.message);
        response.status(500).send({message: error.message});
    }
});


// Update a Book using mongoose
router.put('/:id', async(request, response) => {

    try {
        if (
            !request.body.title || 
            !request.body.author ||
            !request.body.publishYear
        ) {
            return response.status(400).send({
                message: 'Send all required fields: title, author, publishYear',
            });
        }

        const { id } = request.params;

        const result = await Book.findByIdAndUpdate(id, request.body);

        if(!result){
            return response.status(400).send({
                message: 'Book not found',
            });
        }

        return response.status(200).send({message: 'Book Updated successfully'});

    }catch (error){
        console.log(error.message);
        response.status(500).send({message:error.message});
    }

});


//Delete a book
router.delete('/:id', async(request, response) => {
    try {
        const { id } = request.params;

        const del_book = await Book.findByIdAndDelete(id);

        if (!del_book){
            return response.status(404).json({message: 'Book Not found'});
        }

        return response.status(200).send({
            message: 'Book Deleted Successfully',
        })
    }
    catch (error){
        console.log(error.message);
        return response.status(500).send({message: error.message});
    }
});


export default router;