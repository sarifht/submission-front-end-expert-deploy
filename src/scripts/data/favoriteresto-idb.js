import { openDB } from 'idb';
import CONFIG from '../globals/config';

const { DATABASE_NAME, DATABASE_VERSION, OBJECT_STORE_NAME } = CONFIG;

const dbTerasLian = openDB(DATABASE_NAME, DATABASE_VERSION, {
  upgrade(database) {
    database.createObjectStore(OBJECT_STORE_NAME, { keyPath: 'id' });
  },
});

const FavoriteRestoIdb = {
  async getResto(id) {
    return (await dbTerasLian).get(OBJECT_STORE_NAME, id);
  },
  async getAllRestos() {
    return (await dbTerasLian).getAll(OBJECT_STORE_NAME);
  },
  async putResto(resto) {
    return (await dbTerasLian).put(OBJECT_STORE_NAME, resto);
  },
  async deleteResto(id) {
    return (await dbTerasLian).delete(OBJECT_STORE_NAME, id);
  },
};

export default FavoriteRestoIdb;
