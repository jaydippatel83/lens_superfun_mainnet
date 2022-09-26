import React, { useEffect, useState } from 'react'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { addDoc, arrayRemove, arrayUnion, collection, doc, getDocs, query, updateDoc, where } from 'firebase/firestore';
import { db } from '../../firebase/firebase';



function Profile_Likes(props) {
    const [count, setCount] = useState(0);
    const [likeUp, setLikeUp] = useState(false); 

    useEffect(() => {
        getLikeUp();
    }, [props.data?.id, likeUp])


    async function getLikeUp() {
        let id;
        if (props.data.__typename === "Comment") {
            id = props.data?.mainPost?.id;
        } else if (props.data.__typename === "Mirror"){
            id = props.data?.mirrorOf?.id
        } else{
            id = props.data?.id;
        }  
        if (id != undefined) {
            const q = query(collection(db, "Reactions"), where("PublicationId", "==", id));
            const querySnapshot = await getDocs(q);
            if (querySnapshot.empty) {
                setCount(0);
            }
            querySnapshot.forEach((data) => { 
                setCount(data.data().Likes);
            })
        }

    }


    const addReactions = async (data) => { 
        let likeId;
        if (props.data.__typename === "Comment") {
            likeId = props.data?.mainPost?.id;
        } else if (props.data.__typename === "Mirror"){
            likeId = props.data?.mirrorOf?.id
        } else{
            likeId = props.data?.id;
        } 
        const id = window.localStorage.getItem("profileId");
        const q = query(collection(db, "Reactions"), where("PublicationId", "==", likeId));
        const querySnapshot = await getDocs(q);
        if (querySnapshot.empty === true) {
            const docRef = await addDoc(collection(db, "Reactions"), {
                Likes: 1,
                LikesBy: arrayUnion(id),
                PublicationId: data.id
            });
            setLikeUp(!likeUp);
        } else {
            querySnapshot.forEach(async (react) => {
                const nycRef = doc(db, 'Reactions', react.id);
                react.data().LikesBy.map(async (e) => {
                    if (e === id) {
                        await updateDoc(nycRef, {
                            Likes: react.data().Likes - 1,
                            LikesBy: arrayRemove(id),
                        })
                        setLikeUp(!likeUp);
                    } else if (e !== id) {
                        await updateDoc(nycRef, {
                            Likes: react.data().Likes + 1,
                            LikesBy: arrayUnion(id)
                        })
                        setLikeUp(!likeUp);
                    } else {
                        await updateDoc(nycRef, {
                            Likes: react.data().Likes,
                            LikesBy: react.data().LikesBy
                        })
                        setLikeUp(!likeUp);
                    }
                })

                if (react.data().LikesBy.length === 0) {
                    await updateDoc(nycRef, {
                        Likes: react.data().Likes + 1,
                        LikesBy: arrayUnion(id)
                    })
                    setLikeUp(!likeUp);
                }
            });
        }
    }


    return (
        <div
            className="d-flex align-items-center"
            style={{ color: 'white', padding: '2px', margin: '0 5px', cursor: 'pointer' }}
            onClick={() => addReactions(props.data)}
        >
            <FavoriteBorderIcon /> {count}
            <span className="d-none-xss m-2">Likes</span>
        </div>
    )
}

export default Profile_Likes