import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('Authentication system (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('handle a signup request', () => {
    const user = {
      email: 'suka@test.com',
      password: 'password',
    };

    return request(app.getHttpServer())
      .post('/auth/signup')
      .send(user)
      .expect(201)
      .then((res) => {
        const { id, email } = res.body;
        expect(id).toBeDefined();
        expect(email).toEqual(user.email);
      });
  });

  it('sign up as a new user and get the currently logged in user', async () => {
    const user = {
      email: 'duc@test.com',
      password: 'password',
    };

    const  res = await request(app.getHttpServer()).post('/auth/signup').send(user).expect(201);

    const cookie = res.get('Set-Cookie');

    const {body} = await request(app.getHttpServer()).get('/auth/whoami').set('Cookie', cookie).expect(200)

    expect(body.email === user.email)
  });
});
