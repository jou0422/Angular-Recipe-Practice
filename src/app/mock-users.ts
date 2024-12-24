export interface UsersInfo {
  username: string,
  dateOfBirth: Date,
  phone: string,
  email: string,
  password: string,
}

export const Users: UsersInfo[] = [{
  username: 'Leticia',
  dateOfBirth: new Date(1997, 3, 22),
  phone: '0912345678',
  email: 'cia@test.com',
  password: '123456789',

}, {
  username: 'Wen',
  dateOfBirth: new Date(1998, 11, 27) ,
  phone: '0987654321',
  email: 'wen@test.com',
  password: '987654231',
}]
