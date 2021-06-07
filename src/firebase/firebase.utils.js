import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'



const config= {
    apiKey: "AIzaSyC1BUHZyw27DQ2QcaqQ9OO4c3AQOMeRspE",
    authDomain: "clothingdemodb.firebaseapp.com",
    projectId: "clothingdemodb",
    storageBucket: "clothingdemodb.appspot.com",
    messagingSenderId: "407255620246",
    appId: "1:407255620246:web:698288396bc995bf3480b7"
  };
  firebase.initializeApp(config);


export const createUserProfileDocument = async(userAuth, ...additionalData)=>{
    if (!userAuth)return;
    const userRef = firestore.doc(`users/${userAuth.uid}`)
    const snapShot = await userRef.get() 
    
    if(!snapShot.exists){
        const { displayName, email} = userAuth;
        const createdAt = new Date();

        try{
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData
            })
        }catch(error){
            console.log('error creating user', error.message)
        }
    }
    return userRef;

}
 
 export const convertCollectionsSnapshotToMap=(collections)=>{
        ///convert snapshot array of objects to object with extra props
        const transformedCollection = collections.docs.map(doc=>{
            const {title, items} = doc.data();
            return{
                routeName: encodeURI(title.toLowerCase()),
                id: doc.id,
                title,
                items
            }
        })
        return transformedCollection.reduce((accumulator, collection)=> {
            accumulator[collection.title.toLowerCase()] = collection;
            return accumulator;
        },{})
 }
 
export const getCurrentUser = () => {
    return new Promise((resolve, reject) => {
        const unsubscribe = auth.onAuthStateChanged(userAuth=>{
            unsubscribe()
            resolve(userAuth)
        }, reject)    
    })
}


  export const auth = firebase.auth();
  export const firestore= firebase.firestore()

  export const googleProvider= new firebase.auth.GoogleAuthProvider();
  googleProvider.setCustomParameters({prompt:'select_account'});
  export const signInWithGoogle=()=>auth.signInWithPopup(googleProvider);

  export default firebase;