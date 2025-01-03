import { collection, getDoc, doc, getDocs } from 'firebase/firestore'
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
      console.log(querySnapshot.docs.map((doc) => doc.data()))
      return querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }))
    } catch (error) {
      console.error('Error fetching collection:', error)
      throw error
    }
  }
}

export const firestoreService = new FirestoreService()
