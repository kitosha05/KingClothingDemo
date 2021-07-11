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

export const addBlogPost = async(post)=>{
    return await firestore.collection('blogPosts').add(post).then(post=>{
        return post.id
    })
}
export const editBlogPost = async(post)=>{
    const id = post.id
  

    return await firestore.collection('blogPosts').doc(id).update(post)
}
export const fetchBlogPosts = async()=>{
    const blogPostsSnapShot= await firestore.collection('blogPosts').get()
    return blogPostsSnapShot.docs.map(doc=>{
        const id = doc.id
        const post = {id, ...doc.data()}
        return post
    })
}
export const updateOrder= async({order, orderId})=>{
     return await firestore.collection('orders').doc(orderId).update(order).then(error=>{
          if(error)return error
          return fetchSpecificOrder(orderId) 
      })  
      
}

export const fetchSpecificOrder= async(orderId)=>{
    const orderRef= await firestore.collection('orders').doc(orderId).get()
    return {id:orderRef.id, ...orderRef.data()}
}

export const updateProduct = async({product, productId})=>{
    return await firestore.collection('products').doc(productId).update(product).then(product=>{
        return product})
}

export const uploadFile = async (file, currentUser) =>{
   
    var storageRef = storage.ref();
    // Create the file metadata
    // Create the file metadata
var metadata = {
  contentType: 'image/jpeg'
};

// Upload file and metadata to the object 'images/mountains.jpg'
return  storageRef.child('images/' + currentUser.id + '/' + file.name).put(file, metadata)
.then((snapshot)=>snapshot.ref.getDownloadURL());

}




  export const auth = firebase.auth();
  export const firestore= firebase.firestore()

  export const googleProvider= new firebase.auth.GoogleAuthProvider();
  googleProvider.setCustomParameters({prompt:'select_account'});
  export const signInWithGoogle=()=>auth.signInWithPopup(googleProvider);

  export default firebase;