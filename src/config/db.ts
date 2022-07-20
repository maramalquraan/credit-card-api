import mongoose, { ConnectOptions } from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";

let mongoServer: MongoMemoryServer;

const dbConnect = async () => {
  mongoServer = await MongoMemoryServer.create();
  const mongoUri = mongoServer.getUri();

  const options: ConnectOptions = {
    useNewUrlParser: true,
  } as ConnectOptions;

  try {
    await mongoose
      .connect(mongoUri, options)
      .then(() => console.log(`DB Connected on ${mongoUri}`));
  } catch (error) {
    console.log("DB connection Failed::", error);
  }
};

const dbClose = async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
};

const dbClear = async () => {
  const collections = mongoose.connection.collections;
  for (const key in collections) {
    await collections[key].deleteMany({});
  }
};

export { dbConnect, dbClose, dbClear };
