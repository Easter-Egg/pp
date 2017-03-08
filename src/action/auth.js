import * as firebase from 'firebase'

export function signUp(email, pw) {
  return firebase.auth()
          .createUserWithEmailAndPassword(email, pw)
            .then(insertUser)
              .catch((error) => { return error });
}

export function logout() {
  return firebase.auth().signOut();
}

export function login(email, pw) {
  return firebase.auth().signInWithEmailAndPassword(email, pw)
}

export function insertUser(user) {
  return firebase.database().ref().child(`/users/${user.uid}/`)
    .set({
      email: user.email,
      uid: user.uid
    }).then(() => user);
}
