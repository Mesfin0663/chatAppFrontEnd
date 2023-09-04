import {initializeApp} from 'firebase/app'
import {getStorage} from 'firebase/storage'

const firebaseConfig = {
    apiKey: "AIzaSyDC5ELQAQ1w2TAXtM8ssADsRolywV0_l-I",
    authDomain: "file-storage-e8fb3.firebaseapp.com",
    projectId: "file-storage-e8fb3",
    storageBucket: "file-storage-e8fb3.appspot.com",
    messagingSenderId: "1048940576998",
    appId: "1:1048940576998:web:b15fe1e7020344f11a7b27",
    measurementId: "G-3CB6893YM2"
}

const app = initializeApp(firebaseConfig);
const storage = getStorage(process.env.REACT_APP_BUCKET_URL);
export default storage
