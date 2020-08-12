import React from 'react';
import { SIGNUP, LOGINCHECK } from '../Common/Constants';
import firebase from 'firebase';
export const LoginCheck = (data) => {

    const db = firebase.firestore();
    return dispatch => {
        return db.collection("users").where('phone', '==', data.phone)
            .where('password', '==', data.password)
            .get().then(res => {
                if (res.docs.length == 0) {
                    return Promise.reject('Please enter correct phone number and password');
                }
                res.forEach(doc => {
                    if (doc.data()) {
                        var data = { ...doc.data(), id: doc.id }
                        dispatch({
                            type: LOGINCHECK,
                            payload: data
                        })
                        localStorage.setItem('user', JSON.stringify(data))
                        return Promise.resolve('login success');

                    }
                })
            }).catch(function (error) {
                console.log("Error getting document:", error);
                return Promise.reject('Something went wrong.\n Try again ');

            });
    }
}
