import { INewUser } from '@/types'; // Adjust the path based on your project structure
import { ID, AppwriteException } from 'appwrite'; // Assuming 'appwrite' is correctly installed and imported
import { account } from './config'; // Assuming 'config' provides the configured 'account' object

export async function createUserAccount(user: INewUser) {
    try {
        // Generate a unique ID for the user
        const userId = ID.unique();

        // Call the Appwrite SDK to create a new account
        const newAccount = await account.create(
            userId,
            user.email,
            user.password,
            user.name
        );

        // Return the created account
        return newAccount;
    } catch (error) {
        // Handle specific Appwrite exceptions
        if (error instanceof AppwriteException) {
            console.error('Appwrite Error:', error);
            // Handle different types of Appwrite exceptions accordingly
            // You can provide custom error messages or handle specific error codes here
        } else {
            // Log and return the error if any other unexpected error occurs
            console.error('Unexpected Error:', error);
        }
        // Return an error object or rethrow the error if needed
        throw error;
    }
}
