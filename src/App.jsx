import React from 'react'
import './App.css';
import { auth, db  } from "./init.js"
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged
} from "firebase/auth"
import {collection, addDoc, getDocs, getDoc, doc, query, where, updateDoc, deleteDoc} from "firebase/firestore"

function App() {
  const [user, setUser] = React.useState({})
  const [loading, setLoading] = React.useState(true)
  function createPost (){
    const post = {
      title: "traveling the world",
      description: "Bahamas",
      uid: user.uid,
     
      
        };
    addDoc(collection(db, "posts",), post);
  }
 async function updatePost () {
    const Id = 'U5NmsOxd9o3SEWYxEj39'
    const postRef= doc(db,'posts', Id);
    const post = await getPostByID(Id);
    console.log(post)
  const newPost = {
     ...post,
      uid: 5,
    }
    console.log(newPost)
    updateDoc(postRef, newPost)
  }
  function deletePost(){
    const Id = 'U5NmsOxd9o3SEWYxEj39'
    const postRef= doc(db,'posts', Id);
    deleteDoc(postRef)
  }
  
  async function getPostbyUID(){
const postCollectionRef = await query(
  collection(db, "posts"),
  where("uid","==", user.uid)
);
const {docs} = await getDocs(collection(db, "posts"))
console.log(docs.map(doc=> doc.data()))
  }
 async function getAllPosts (){
    const {docs} = await getDocs(postCollectionRef)
    console.log(docs);
    const posts = docs.map((elem) => ({...elem.data(), id: elem.id}))
    console.log(posts)
  }
  async function getPostByID (Id){
   
    const postRef= doc(db,'posts', Id); 
    const postSnap = await getDoc(postRef);
  return postSnap.data();
  }
  React.useEffect(()=> {
    onAuthStateChanged(auth, (user) => {
      setLoading(false)
      console.log(user)
      if (user) {
        setUser(user)
      }

    })
  }, [])
  function register (){
    createUserWithEmailAndPassword (auth, 'emial@slart.com', 'test123')
    .then((user) => {
      console.log(user)
      
    })
    .catch((error)=> {
       console.log(error)
    })
  }
    function login (){
      signInWithEmailAndPassword(auth, 'emial@slart.com', 'test123')
      .then(({user}) => {
        console.log(user)
        setUser(user)
      })
      .catch((error)=> {
         console.log(error)
      })
}
function logout (){
  signOut(auth)
  setUser({})
}
  
  return (
 <div className="slatt">
  <button onClick={register}> Register</button>
  <button onClick={login}> Login </button>
  <button onClick={logout}> Logout </button>
  {loading ? "loading..." : user.email}
  <button onClick={createPost}>Create Post</button>
  <button onClick={getAllPosts}>Get All Posts</button>
  <button onClick={getPostByID}>Get Post by ID</button>
  <button onClick={getPostbyUID}>Get Post by UID</button>
  <button onClick={updatePost}>Update Post</button>
  <button onClick={deletePost}>Delete Post</button>
 </div>
     
  );
}

export default App;
