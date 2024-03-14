import { INewUser } from "@/types"; // Adjust the path based on your project structure
import { ID  , Query} from "appwrite"; // Assuming 'appwrite' is correctly installed and imported
import { account, appwriteConfig, avatars, databases } from "./config"; // Assuming 'config' provides the configured 'account' object


export async function createUserAccount(user: INewUser) {
  try {
    const newAccount = await account.create(
      ID.unique(),
      user.email,
      user.password,
      user.name
    );

    if (!newAccount) throw Error;

    const avatarUrl = avatars.getInitials(user.name);

    const newUser = await saveUserToDB({
      accountId: newAccount.$id,
      name: newAccount.name,
      email: newAccount.email,
      username: user.username,
      imageUrl: avatarUrl,
    });

    return newUser;
  } catch (error) {
    console.log(error);
    return error;
  }
}
export async function saveUserToDB(user: {
  accountId: string;
  email: string;
  name: string;
  imageUrl: URL;
  username?: string;
}) {
  try {
    const newUser = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      ID.unique(),
      user
    );

    return newUser;
  } catch (error) {
    console.log(error);
  }
}

export async function signInAccount(user: { email: string; password: string }) {
  try {
    const session = await account.createEmailSession(user.email, user.password);

    return session;
  } catch (error) {
    console.log(error);
  }
}

export async function getAccount() {
  try {
    console.log('before');
    
    const currentAccount = await account.get();
    console.log('after');
    
    return currentAccount;
  } catch (error) {
    console.log(error);
    console.log('supposed to happen');  
    
  }
}



export async function getCurrentUser() {
  try {
    const currentAccount = await getAccount(); // Assuming you have a function to retrieve the current account details

    if (!currentAccount) throw Error('No current account found');

    const currentUser = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      [Query.equal('accountId', currentAccount.$id)]
    );

    if (!currentUser || !currentUser.documents || currentUser.documents.length === 0) {
      throw Error('Current user not found in database');
    }

    return currentUser.documents[0];
  } catch (error) {
    console.log(error);
    return null;
  }
}