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

    const users: User[] = [];
    fakeUserService = {
      find: (email: string) => {
        const filteredUsers = users.filter((user) => user.email === email);
        return Promise.resolve(filteredUsers);
      },
      create: (email: string, password: string) => {
        const user = {
          id: Math.floor(Math.random() * 999999),
          email,
          password,
        } as User;
        users.push(user);
        return Promise.resolve(user);
      },
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
    await service.signup('frontend@4real.com', 'sdadsadasdsa')
    await expect(service.signup('frontend@4real.com', 'asdf')).rejects.toThrow(
      BadRequestException,
    );
  });

  it('throw if signin is called with unused email', async () => {
    await expect(
      service.signin('asdasd@gmail.com', 'dsadsadsdadas'),
    ).rejects.toThrow(NotFoundException);
  });

  it('throws if an invalid passworld is provided', async () => {
    
    await service.signup('devops@4real.com', 'asdcxacsa')
    await expect(
      service.signin('devops@4real.com', 'passowrd'),
    ).rejects.toThrow(BadRequestException);
  });

  it('return a user of correct password is provided', async () => {
    await service.signup('backedn@4real.com', 'thisispassword123')

    const user = await service.signin('backedn@4real.com', 'thisispassword123');
    expect(user).toBeDefined();
    // const user = await service.signup('test@4real.com', 'thisispassword123')
    // console.log(user)
  });
});
