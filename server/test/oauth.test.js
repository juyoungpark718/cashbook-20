require('dotenv').config();

const { sequelize } = require('../models');
const app = require('../app');
const supertest = require('supertest');
const request = supertest(app);

describe('OAuth 테스트', () => {
  beforeAll(async () => {
    await sequelize.sync();
  });

  test('request query에 code가 없는 경우', async () => {
    await request.get('/user/auth').expect(400);
  });

  describe('request query에 code가 있는 경우', () => {
    test('code를 통해 user 정보를 가져오고, 해당 유저가 db에 존재하는 경우 200', async () => {
      const res = await request.get('/user/auth').expect(200);
      const { token } = res.body;
      expect(token).toBeDefined();
    });

    test('code를 통해 user 정보를 가져오고, 해당 유저가 db에 존재하지 않는 경우 유저 생성 후 201', async () => {
      const res = await request.get('/user/auth').expect(201);
      const { token } = res.body;
      expect(token).toBeDefined();
    });
  });

  afterAll(async () => {
    await sequelize.close();
  });
});
