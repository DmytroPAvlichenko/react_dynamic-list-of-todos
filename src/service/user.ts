import { User } from '../types/User';
import { getData } from '../Utils/UtilsClient';

export function getUsers(userId: number) {
  return getData<User[]>('/users.json').then(users =>
    users.find(user => user.id === userId),
  );
}
