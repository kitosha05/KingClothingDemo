import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import "firebase/storage"



const config= {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: "clothingdemodb.firebaseapp.com",
    projectId: "clothingdemodb",
    storageBucket: "clothingdemodb.appspot.com",
    messagingSenderId: "407255620246",
    appId: "1:407255620246:web:698288396bc995bf3480b7",
    storageBucket: 'gs://clothingdemodb.appspot.com'
  };
  firebase.initializeApp(config);
var storage = firebase.storage()


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
                isAdmin:false,
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

export const uploadFile = file =>{

    var storageRef = storage.ref();
    // Create the file metadata
var metadata = {
    contentType: 'image/jpeg'
  };
  
  // Upload file and metadata to the object 'images/mountains.jpg'
  var uploadTask = storageRef.child('images/' + file.name).put(file, metadata);
  
  // Listen for state changes, errors, and completion of the upload.
  uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
    (snapshot) => {
      // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
      var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log('Upload is ' + progress + '% done');
      switch (snapshot.state) {
        case firebase.storage.TaskState.PAUSED: // or 'paused'
          console.log('Upload is paused');
          break;
        case firebase.storage.TaskState.RUNNING: // or 'running'
          console.log('Upload is running');
          break;
      }
    }, 
    (error) => {
      // A full list of error codes is available at
      // https://firebase.google.com/docs/storage/web/handle-errors
      switch (error.code) {
        case 'storage/unauthorized':
          // User doesn't have permission to access the object
          break;
        case 'storage/canceled':
          // User canceled the upload
          break;
  
        // ...
  
        case 'storage/unknown':
          // Unknown error occurred, inspect error.serverResponse
          break;
      }
    }, 
    () => {
      // Upload completed successfully, now we can get the download URL
      uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
        console.log('File available at', downloadURL);
      });
    }
  );
}


  export const auth = firebase.auth();
  export const firestore= firebase.firestore()

  export const googleProvider= new firebase.auth.GoogleAuthProvider();
  googleProvider.setCustomParameters({prompt:'select_account'});
  export const signInWithGoogle=()=>auth.signInWithPopup(googleProvider);

  export default firebase;