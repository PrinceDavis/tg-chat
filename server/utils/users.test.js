const expect = require('expect');
const {Users} = require('./users');


describe('User', function () {
  var myUsers;
  beforeEach(() => {
    myUsers = new Users();
    myUsers.users = [
      {
       id: 1,
       name: 'OssaijaD',
       room: 'general',
     },{
       id: 2,
       name: 'Davis',
       room: 'imagine',
     }, {
       id: 3,
       name: 'Tg',
       room: 'general'
     }
    ];
  });

  it('should add a new users', function () {
    let users = new Users();
    console.log(users);
    let me = {
      id: '1232ddd',
      name: 'OssaijaD',
      room: 'general'
    };
    let user = users.addUser(me.id, me.name, me.room);
    expect(users.users).toEqual([user])
  });

  it('should return a users with id', function () {
    let user = myUsers.getUser(1);
    expect(user.name).toEqual('OssaijaD');
  });

  it('should get remove a users from the list', function () {
    let users = myUsers.removeUser(1);
    expect(myUsers.users.length).toEqual(2);
  });

  it('should return names for general room', function () {
    let userList = myUsers.getUserList('general');
    expect(userList).toEqual(['OssaijaD', 'Tg']);
  });

  it('should return names for general imagine', function () {
    let userList = myUsers.getUserList('imagine');
    expect(userList).toEqual(['Davis']);
  });
});
