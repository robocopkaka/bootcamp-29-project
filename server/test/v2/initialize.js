import db from '../../models/index';

const { sequelize } = db;

describe('drop tables', () => {
  beforeEach((done) => {
    sequelize.sync({ force: true }).then(() => { done(); });
  });
});
