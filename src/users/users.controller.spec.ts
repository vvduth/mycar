import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { AuthService } from './auth.service';
import { User } from './users.entity';
import { NotFoundException } from '@nestjs/common';

describe('UsersController', () => {
  let controller: UsersController;
  let fakeUsersService: Partial<UsersService>
  let fakeAuthService: Partial<AuthService> 

  beforeEach(async () => {

    fakeUsersService ={
      findOne: (id: number) => {return Promise.resolve({
        id:1,
        email: 'ducops@email.com', 
        password: '2312321313'
      } as User)},
      find: (email: string) => {
        return Promise.resolve([{
          id: 1, email, password: '2312321313'
        } as User])
      },
      // remove: () => {},
      // update: () => {},
    }
    fakeAuthService = {
      // signup: (email, password) => {},
       signin: (email:string, password: string ) => {
        return Promise.resolve({id: 1, email , password} as User)
       }
    }
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers : [
        {provide: UsersService, useValue: fakeUsersService },
        {provide: AuthService, useValue: fakeAuthService}
      ]
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('findAllUser rreturn a list of users with given email', async ( ) => {
    const users = await controller.findAllUser('ducops@email.com')
    expect(users.length === 1)
    expect(users[0].email === 'ducops@email.com')
  })

  it ('test findUser returns null if user with given id is not found', async () => {
    fakeUsersService.findOne = ( ) => null;
    await expect(controller.getUser('1')).toEqual(null)
  })

  it('findUser return a single user with the given id', async () => {
    const user = await controller.getUser('1')
    expect(user).toBeDefined()
  })

  it('singIn update session obejct and return user', async () => {
    const session = {userId: -10}
    const user = await controller.signin({email: 'ducops@4real.com', password: '12121313'},
      session
    )

    expect(user.id).toEqual(1);
    expect(session.userId).toEqual(1)
  })
});
