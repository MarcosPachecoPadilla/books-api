const request = require('supertest');
const app = require('../server');

describe('Books API', () => {

  test('GET /api/books returns all books', async () => {
    const response = await request(app).get('/api/books');

    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  test('GET /api/books/:id returns one book', async () => {
    const response = await request(app).get('/api/books/1');

    expect(response.statusCode).toBe(200);
    expect(response.body.id).toBe(1);
  });

  test('GET /api/books/:id returns 404 if book is not found', async () => {
    const response = await request(app).get('/api/books/999');

    expect(response.statusCode).toBe(404);
  });

  test('POST /api/books creates a new book', async () => {
    const newBook = {
      title: 'Dune',
      author: 'Frank Herbert',
      genre: 'Science Fiction',
      copiesAvailable: 4
    };

    const response = await request(app)
      .post('/api/books')
      .send(newBook);

    expect(response.statusCode).toBe(201);
    expect(response.body.title).toBe('Dune');
    expect(response.body.author).toBe('Frank Herbert');
  });

  test('PUT /api/books/:id updates a book', async () => {
    const updatedBook = {
      title: 'The Great Gatsby',
      author: 'F. Scott Fitzgerald',
      genre: 'Fiction',
      copiesAvailable: 10
    };

    const response = await request(app)
      .put('/api/books/1')
      .send(updatedBook);

    expect(response.statusCode).toBe(200);
    expect(response.body.copiesAvailable).toBe(10);
  });

  test('PUT /api/books/:id returns 404 if book is not found', async () => {
    const response = await request(app)
      .put('/api/books/999')
      .send({
        title: 'Test Book',
        author: 'Test Author',
        genre: 'Fiction',
        copiesAvailable: 1
      });

    expect(response.statusCode).toBe(404);
  });

  test('DELETE /api/books/:id removes a book', async () => {
    const createResponse = await request(app)
      .post('/api/books')
      .send({
        title: 'Book to Delete',
        author: 'Test Author',
        genre: 'Fiction',
        copiesAvailable: 1
      });

    const bookId = createResponse.body.id;

    const response = await request(app)
      .delete(`/api/books/${bookId}`);

    expect(response.statusCode).toBe(200);
    expect(response.body.id).toBe(bookId);
  });

  test('DELETE /api/books/:id returns 404 if book is not found', async () => {
    const response = await request(app).delete('/api/books/999');

    expect(response.statusCode).toBe(404);
  });

});