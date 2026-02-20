import * as migration_20260219_121843 from './20260219_121843';
import * as migration_20260219_195430_add_strategic_submissions from './20260219_195430_add_strategic_submissions';
import * as migration_20260220_013000_add_trajectory_3m_period from './20260220_013000_add_trajectory_3m_period';

export const migrations = [
  {
    up: migration_20260219_121843.up,
    down: migration_20260219_121843.down,
    name: '20260219_121843',
  },
  {
    up: migration_20260219_195430_add_strategic_submissions.up,
    down: migration_20260219_195430_add_strategic_submissions.down,
    name: '20260219_195430_add_strategic_submissions'
  },
  {
    up: migration_20260220_013000_add_trajectory_3m_period.up,
    down: migration_20260220_013000_add_trajectory_3m_period.down,
    name: '20260220_013000_add_trajectory_3m_period',
  },
];
