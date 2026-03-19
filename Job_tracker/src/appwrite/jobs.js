 import conf from "../conf/conf"
import { Query } from 'appwrite'
import { databases, ID } from './config'

export class JobService {

  async createJob(jobData) {
    try {
      return await databases.createDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        ID.unique(),
        {
          title:    jobData.title,
          company:  jobData.company,
          location: jobData.location,
          status:   jobData.status,
          notes:    jobData.notes,
        }
      )
    } catch (error) {
      throw error
    }
  }

  async getJobs() {
    try {
      return await databases.listDocuments(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        [Query.orderDesc('$createdAt')]
      )
    } catch (error) {
      throw error
    }
  }

  async updateJob(jobId, updatedData) {
    try {
      return await databases.updateDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        jobId,
        updatedData
      )
    } catch (error) {
      throw error
    }
  }

  async deleteJob(jobId) {
    try {
      await databases.deleteDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        jobId
      )
      return true
    } catch (error) {
      throw error
    }
  }

}

const jobService = new JobService()
export default jobService