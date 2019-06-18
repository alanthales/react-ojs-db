import ojsDb from "ojs-db";

const DataProxies = ojsDb.DbProxies;

const createDb = async (proxy, opts) => {
  const db = new ojsDb.DbFactory(proxy, opts);

  await db.createDb();

  const createDataSet = (name = "default") => db.dataset(name);
  
  return { createDataSet };
};

export { createDb, DataProxies };