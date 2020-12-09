const fs = require('fs');
const pool = require('./lib/utils/pool.js');
const request = require('supertest');
const app = require('./lib/utils/app.js');
const Food = require('./lib/utils/model/Foods.js');


// Foods courtesy of random food generator
describe('app tests for Foods', () => {
  beforeEach(() => {
    return pool.query(fs.readFileSync('./sql/setup.sql', 'utf-8'));
  });
  afterAll(() => {
    return pool.end();
  });

  it('creates a food', async () => {
    const res = await request(app)
      .post('/foods')
      .send({
        name: 'Steak and black pepper ciabatta',
        taste: '6',
        complexity: '3'
      });
    expect(res.body).toEqual({
      id: '1',
      name: 'Steak and black pepper ciabatta',
      taste: 6,
      complexity: 3
    });
  });

  it('Gets ALL foods', async () => {
    const food = await Food.insert({ name: 'Tomato and avocado spaghetti', taste: '4', complexity: '4' });
    const res = await request(app)
      .get('/foods');
    expect(res.body).toEqual([food]);
  });

  it('Get Food by id', async () => {
    const food = await Food.insert({ name: 'Fish and ginger cake', taste: '2', complexity: '5' });
    const res = await request(app)
      .get(`/foods/${food.id}`);
    expect(res.body).toEqual(food);
  });

  it('updates a food', async () => {
    const food = await Food.insert({ name: 'Broccoli and aubergine fusilli', taste: '7', complexity: '8' });
    const res = await request(app)
      .put(`/foods/${food.id}`)
      .send({
        name: 'Ginger and pumpkin seed crumble',
        taste: '8',
        complexity: '7'
      });
    expect(res.body).toEqual({
      ...food,
      name: 'Ginger and pumpkin seed crumble',
      taste: 8,
      complexity: 7
    });
  });

  it('deletes a food using id', async () => {
    const food = await Food.insert({ name: 'Rhubarb and ginger stir fry', taste: '6', complexity: '8' });

    const res = await request(app)
      .delete(`/foods/${food.id}`);

    expect(res.body).toEqual({
      ...food,
      name: 'Rhubarb and ginger stir fry',
      taste: 6,
      complexity: 8
    });
  });
});
