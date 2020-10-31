const request = require('supertest');
const { Genre } = require('../../models/genre');

let server;

describe('/api/genres', () => {
  beforeEach(() => { server = require('../../index'); });
  afterEach( async () => { 
    server.close();
    // removes data from genres collection
    await Genre.deleteMany({});
  });

  describe('GET /', () => {
    it('should return all genres', async () => {
      await Genre.collection.insertMany([
        {name: "genre1"},
        {name: "genre2"},
        {name: "genre3"},
        {name: "genre4"},
        {name: "genre5"}
      ]);
      const res = await request(server).get('/api/genres');

      expect(res.status).toBe(200);
      expect(res.body.length).toBe(5);
      expect(res.body.some(g => g.name === 'genre1')).toBeTruthy();
      expect(res.body.some(g => g.name === 'genre2')).toBeTruthy();
      expect(res.body.some(g => g.name === 'genre3')).toBeTruthy();
      expect(res.body.some(g => g.name === 'genre4')).toBeTruthy();
      expect(res.body.some(g => g.name === 'genre5')).toBeTruthy();
    });
  });
});