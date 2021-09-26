import config from '@app/ormconfig';

const ormseedconfig = {
  ...config,
  migrations: [__dirname + '/seeds/**/*{.ts,.js}'],
  cli: {
    migrationDir: 'src/seeds',
  },
};
export default ormseedconfig;
