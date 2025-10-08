import { User } from '../types/User';
import { getData } from '../Utils/UtilsClient';

export function getUsers(useId: number) {
  return getData<User>(`/users/${useId}.json`).then(users => users);
}
