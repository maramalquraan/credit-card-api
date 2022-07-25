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
   try {
    await mongoose.disconnect();
    await mongoServer.stop();
  } catch (error) {
    console.log("Closing DB connection is failed::", error);
  }
};

const dbClear = async () => {
  try{
    const collections = mongoose.connection.collections;
    for (const key in collections) {
      await collections[key].deleteMany({});
    }
  } catch (error) {
    console.log("Clearing DB collections is failed::", error);
  }
};

export { dbConnect, dbClose, dbClear };
