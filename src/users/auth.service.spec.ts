import { map } from 'rxjs';
import { Test } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersService } from './users.service';
import { User } from './user.entity';
import { BadRequestException, NotFoundException } from '@nestjs/common';
describe('Auth service', () => {
  let service: AuthService;
  let fakeUserService: Partial<UsersService>;

  beforeEach(async () => {
    // fake copy of user service

    fakeUserService = {
      find: () => Promise.resolve([]),
      create: (email: string, password: string) =>
        Promise.resolve({ id: 1, email, password } as User),
    };
    const module = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UsersService,
          useValue: fakeUserService,
        },
      ],
    }).compile();

    service = module.get(AuthService);
  });

  it('can create an instance of auth service', async () => {
    expect(service).toBeDefined();
  });

  it('cretae a new user with salt and ahsded password', async () => {
    const user = await service.signup('duke@4real.com', 'thisispassword');

    expect(user.password).not.toEqual('thisispassword');
    const [salt, hash] = user.password.split('.');

    expect(salt).toBeDefined();
    expect(hash).toBeDefined();
  });

  it('throws an error if user signs up with email that is in use', async () => {
    fakeUserService.find = () =>
      Promise.resolve([{ id: 1, email: 'a', password: '1' } as User]);
    await expect(service.signup('asdf@asdf.com', 'asdf')).rejects.toThrow(
      BadRequestException,
    );
  });

  it('throw if signin is called with unused email', async () => {
    await expect(
      service.signin('asdasd@gmail.com', 'dsadsadsdadas'),
    ).rejects.toThrow(NotFoundException);
  });
  it('throws if an invalid passworld is provided', async () => {
    fakeUserService.find = () =>
      Promise.resolve([
        { email: 'asdf@asdf.com', password: 'laskdjf' } as User,
      ]);
    await expect(
      service.signin('laskdjf@alskdfj.com', 'passowrd'),
    ).rejects.toThrow(BadRequestException);
  });
  it('return a user of correct password is provided', async () => {
    fakeUserService.find = () =>
      Promise.resolve([
        {
          email: 'backend@4real.com',
          password:
            '1831369ffa610c4f.93e657eb7ff040ec1d0d64d8de39faa1e782b670640b26e28be6f49a8fa1a400',
        } as User,
      ]);

      const user  = await service.signin('backedn@4real.com','thisispassword123' )
      expect(user).toBeDefined()
    // const user = await service.signup('test@4real.com', 'thisispassword123')
    // console.log(user)
  });
});
