// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import {
	getAuth,
	GoogleAuthProvider,
	signInWithPopup,
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	updateProfile,
	signOut,
	User,
	onAuthStateChanged,
	NextOrObserver,
} from 'firebase/auth';
import {
	doc,
	getDoc,
	setDoc,
	getFirestore,
	serverTimestamp,
	collection,
	updateDoc,
	QuerySnapshot,
	DocumentData,
	arrayUnion,
} from 'firebase/firestore';
import { ProfileInfo } from '../src/components/ProfilePageUserInfo';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: 'AIzaSyB8u1V-xfiy8CVOepXnrrwZiGw4c7R0Lqc',
	authDomain: 'rizzshop-react-ts.firebaseapp.com',
	projectId: 'rizzshop-react-ts',
	storageBucket: 'rizzshop-react-ts.appspot.com',
	messagingSenderId: '467743685320',
	appId: '1:467743685320:web:15c5b593171cb23c2803fd',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
// provider.setCustomParameters({
// 	prompt: `Hello`,
// });

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

export const signInWithGooglePopup = async () =>
	await signInWithPopup(auth, provider);

export const db = getFirestore();

export const createUserInFireStore = async (userAuth: User) => {
	const userDocRef = doc(db, 'users', userAuth.uid);

	const userSnapShot = await getDoc(userDocRef);

	//if userData not exists
	if (!userSnapShot.exists()) {
		const { email, displayName } = userAuth;
		const createdAt = serverTimestamp();

		try {
			await setDoc(userDocRef, {
				email,
				displayName,
				createdAt,
			});
		} catch (error) {
			console.log(
				'🚀 ~ file: firebaseConfig.ts:55 ~ createUserWithGoogle ~ error:',
				error
			);
		}
	}
	//if userData exists
	return userDocRef;
};

export const createAuthUserWithEmailAndPassword = async (
	email: string,
	password: string,
	displayName: string
) => {
	const res = await createUserWithEmailAndPassword(auth, email, password);
	await updateProfile(res.user, { displayName: displayName });
	return res;
};
export const signInAuthWithEmailAndPassword = async (
	email: string,
	password: string
) => signInWithEmailAndPassword(auth, email, password);

export const signOutFun = async () => await signOut(auth);

export const omAuthStateChangedListener = (callback: NextOrObserver<User>) =>
	onAuthStateChanged(auth, callback);

export const addCartToUserProfile = async (
	uid: string,
	cartItem: any,
	cartTotal: number
) => {
	try {
		// const userCollectionRef = await collection(db, 'users');
		const userDocRef = doc(db, 'users', uid);
		// const userSnap = await getDoc(userDocRef);
		// if (userSnap.exists())
		// 	console.log(
		// 		'🚀 ~ file: firebaseConfig.ts:102 ~ getUser ~ userSnap:',
		// 		userSnap
		// 	);
		const userSnapShot = await getDoc(userDocRef);
		await updateDoc(userDocRef, {
			cart: { cartItem, cartTotal },
		});
	} catch (error) {
		console.log('🚀 ~ file: firebaseConfig.ts:119 ~ error:', error);
	}
};
export const getUserFromFirestore = async (uid: string) => {
	// const userCollectionRef = await collection(db, 'users');
	const userDocRef = doc(db, 'users', uid);
	const userSnap = await getDoc(userDocRef);
	return userSnap.data();
	// const userSnapShot = await getDoc(userDocRef);
};

export const updateUserProfile = async (user: ProfileInfo, uid: string) => {
	try {
		const userDocRef = doc(db, 'users', uid);
		const userSnapShot = await getDoc(userDocRef);
		return await updateDoc(userDocRef, {
			...user,
		});
	} catch (error) {
		console.log('🚀 ~ file: firebaseConfig.ts:119 ~ error:', error);
	}
};
export const confirmOrderList = async (
	uid: string,
	cartItem: any,
	cartTotal: number,
	orderid: string
) => {
	try {
		// const userCollectionRef = await collection(db, 'users');
		const userDocRef = doc(db, 'users', uid);
		// const userSnap = await getDoc(userDocRef);
		// if (userSnap.exists())
		// 	console.log(
		// 		'🚀 ~ file: firebaseConfig.ts:102 ~ getUser ~ userSnap:',
		// 		userSnap
		// 	);
		const createdAt = new Date();

		const userSnapShot = await getDoc(userDocRef);
		await updateDoc(userDocRef, {
			confirmedOrders: arrayUnion({ cartItem, cartTotal, createdAt, orderid }),
		});
	} catch (error) {
		console.log('🚀 ~ file: firebaseConfig.ts:119 ~ error:', error);
	}
};

export const getUser = async (uid: string): Promise<DocumentData> => {
	const userDocRef = doc(db, 'users', uid);
	const userSnapShot = await getDoc(userDocRef);
	return userSnapShot.data() as DocumentData;
};

import {
	getStorage,
	ref,
	uploadBytesResumable,
	getDownloadURL,
} from 'firebase/storage';

export const updatePhotoUrl = async (uid: string, image: File) => {
	// try {
	// 	const db = firebase.firestore();
	// 	const storageRef = storage.ref(`users/${uid}/profilePicture.jpg`);
	// 	await storageRef.put(image);
	// 	const downloadURL = await storageRef.getDownloadURL();
	// 	const res = await db.collection('users').doc(uid).update({
	// 		photoURL: downloadURL,
	// 	});
	// 	console.log('🚀 ~ file: firebaseConfig.ts:188 ~ res ~ res:', res);
	// } catch (error) {
	// 	console.error(error);
	// }
	return new Promise((resolve, reject) => {
		const storage = getStorage();
		const fileName = `${uid}--${image.name}`;

		const storageRef = ref(storage, 'images/' + fileName);
		const uploadTask = uploadBytesResumable(storageRef, image);
		uploadTask.on(
			'state_changed',
			snapshot => {
				// Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
				const progress =
					(snapshot.bytesTransferred / snapshot.totalBytes) * 100;
				console.log('Upload is ' + progress + '% done');
				switch (snapshot.state) {
					case 'paused':
						console.log('Upload is paused');
						break;
					case 'running':
						console.log('Upload is running');
						break;
					default:
						break;
				}
			},
			error => {
				reject(error);
			},
			() => {
				// Upload completed successfully, now we can get the download URL
				getDownloadURL(uploadTask.snapshot.ref).then(downloadURL => {
					resolve(downloadURL);
				});
			}
		);
	});
};

export const updateProfilePhotoTofirebase = async (
	user: User,
	image: string
) => {
	await updateProfile(user, { photoURL: image });
};
