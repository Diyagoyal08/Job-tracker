import conf from "../conf/conf.js"
import { Client, Account, Databases, ID } from 'appwrite'


const client = new Client()
  .setEndpoint(conf.appwriteUrl) 
  .setProject(conf.appwriteProjectId)  
  

export const account = new Account(client)
export const databases = new Databases(client)

export { ID }