import { Client, Account, ID } from "appwrite";
import conf from "../conf/config";

export class AuthService {
  client = new Client();
  account;
  
  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl) // Ensure this URL is correct
      .setProject(conf.appwriteProjectId); // Ensure this project ID is correct
    this.account = new Account(this.client);
    
  }

  async signUp({ email, password, username }) {
    try {
      console.log("Appwrite URL:", conf.appwriteUrl);
      console.log("Appwrite Project ID:", conf.appwriteProjectId);

      const userAccount = await this.account.create(
        ID.unique(),
        email,
        password,
        username
      );
      if (userAccount) {
        return this.login({ email, password });
      }
      return userAccount;
    } catch (error) {
      throw error;
    }
  }

  async login({ email, password }) {
    try {
      return await this.account.createEmailPasswordSession(email, password);
    } catch (error) {
      console.log("Authentication :: login ", error);
      throw error;
    }
  }

  async getCurrentUser() {
    try {
      const userCurrentState = await this.account.get();
      return userCurrentState;
    } catch (error) {
      console.log("Appwrite service :: getCurrentUser :: error", error);
      throw error;
    }
  }

  async logOut() {
    try {
      await this.account.deleteSessions();
    } catch (error) {
      console.log("Appwrite service :: logout :: error", error);
      throw error;
    }
  }
}
const auth = new AuthService();
export  default auth;
