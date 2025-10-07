import { User } from '../types/User';
import { getData } from '../Utils/UtilsClient';

export function getUsers() {
  return getData<User[]>('/users.json').then(users => users);
}
