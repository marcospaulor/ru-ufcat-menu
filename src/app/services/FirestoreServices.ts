import {
  collection,
  getDoc,
  doc,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
} from 'firebase/firestore'
import { db } from '../firebase/config'

class FirestoreService {
  /**
   * Obtém um documento específico em uma coleção
   * @param collectionName Nome da coleção
   * @param docName Nome do documento
   */
  async getDocument(collectionName: string, docName: string) {
    try {
      const docRef = doc(db, collectionName, docName)
      const docSnap = await getDoc(docRef)

      if (docSnap.exists()) {
        return docSnap.data()
      } else {
        throw new Error('Document not found')
      }
    } catch (error) {
      console.error('Error fetching document:', error)
      throw error
    }
  }

  /**
   * Obtém todos os documentos de uma coleção
   * @param collectionName Nome da coleção
   */
  async getCollection(collectionName: string) {
    try {
      const colRef = collection(db, collectionName)
      const querySnapshot = await getDocs(colRef)
      return querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }))
    } catch (error) {
      console.error('Error fetching collection:', error)
      throw error
    }
  }

  /**
   * Adiciona um novo documento em uma coleção
   * @param collectionName Nome da coleção
   * @param data Dados do documento
   */
  async addDocument(collectionName: string, data: any) {
    try {
      const colRef = collection(db, collectionName)
      const docRef = await addDoc(colRef, data)
      return { id: docRef.id, ...data }
    } catch (error) {
      console.error('Error adding document:', error)
      throw error
    }
  }

  /**
   * Atualiza um documento em uma coleção
   * @param collectionName Nome da coleção
   * @param docName Nome do documento
   * @param data Dados do documento
   */
  async updateDocument(collectionName: string, docName: string, data: any) {
    try {
      const docRef = doc(db, collectionName, docName)
      await updateDoc(docRef, data)
      return { id: docName, ...data }
    } catch (error) {
      console.error('Error updating document:', error)
      throw error
    }
  }

  /**
   * Deleta um documento em uma coleção
   * @param collectionName Nome da coleção
   * @param docName Nome do documento
   */
  async deleteDocument(collectionName: string, docName: string) {
    try {
      const docRef = doc(db, collectionName, docName)
      await deleteDoc(docRef)
      return
    } catch (error) {
      console.error('Error deleting document:', error)
      throw error
    }
  }
}

export const firestoreService = new FirestoreService()
