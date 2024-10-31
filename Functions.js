/*
* FILE        : Functions.js
* 
* Description : Contains related generic databse function that will be utilized from interface screens
* 
* Author      : Abdurrahman Almouna, Yafet Tekleab
* Date        : October 31, 2024
* Version     : 1.0
* 
*/

import { db } from './firebaseConfig';
import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc, Timestamp } from 'firebase/firestore';

// Add data
export const addDocument = async (collectionName, data) => {
  try {
    const docRef = await addDoc(collection(db, collectionName), {
        ...data,
        createdAt: Timestamp.fromDate(new Date()), // Store as Firestore Timestamp
      });
    console.log("Document written with ID: ", docRef.id);
    return docRef.id; 
  } catch (e) {
    console.error("Error adding document: ", e);
    throw e; 
  }
};

// Fetch data
export const fetchDocuments = async (collectionName) => {
    const querySnapshot = await getDocs(collection(db, collectionName));
    const documents = querySnapshot.docs.map(doc => {
        const data = doc.data();
        return {
            id: doc.id,
            ...data,
            createdAt: data.createdAt.toDate(), // Convert Firestore Timestamp to JS Date
        };
    });
    return documents;
};


// Update data
export const updateDocument = async (collectionName, id, data) => {
  const docRef = doc(db, collectionName, id);
  try {
    await updateDoc(docRef, data);
    console.log("Document updated with ID: ", id);
  } catch (e) {
    console.error("Error updating document: ", e);
    throw e;
  }
};

// Delete data
export const deleteDocument = async (collectionName, id) => {
  const docRef = doc(db, collectionName, id);
  try {
    await deleteDoc(docRef);
    console.log("Document deleted with ID: ", id);
  } catch (e) {
    console.error("Error deleting document: ", e);
    throw e;
  }
};

// Update Status
const updateStatus = async (requestId, newStatus) => {
    try {
        const requestRef = doc(db, 'repairRequests', requestId);
        await updateDoc(requestRef, {
            status: newStatus,
        });
        console.log("Status updated successfully");
    } catch (error) {
        console.error("Error updating status:", error);
    }
};
