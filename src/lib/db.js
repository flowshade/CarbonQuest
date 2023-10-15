import Dexie from 'dexie';

export const db = new Dexie('carbonquestDB');
db.version(1).stores({
  goals: '++id, goalTitle, totalEmissions, emissionGoal, hourOrUsageGoal', // Primary key and indexed props
});

db.version(1).stores({
  profile: '++id, name'
})

db.version(1).stores({
  stats: '++id, day, emissionsTotal, streak'
})