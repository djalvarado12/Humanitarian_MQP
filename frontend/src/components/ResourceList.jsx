import React, { useState } from 'react';
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import { List, ListItem } from '@material-ui/core';

export default function ResourceList(){
    const [user, setUser] = useState(false);
    const [dbData, setDBData] = useState();

    firebase.auth().onAuthStateChanged(userStatus => {
        if (userStatus && !user) {
            setUser(true);
            firebase.firestore().collection("resources").get().then((snapshot) => {
                let data = [];
                snapshot.forEach((doc) => {
                    console.log(doc.data());
                    let thisData = doc.data();
                    let tempInfo = {
                        "Address":thisData.Address,
                        "City":thisData.City,
                        "Description":thisData.Description,
                        "Email":thisData.Email,
                        "Name":thisData.Name,
                        "Phone":thisData.Phone,
                        "Website":thisData.Website
                    }
                    data.push(tempInfo);
                })
                setDBData(data);
            })
        } else if (!user) {
            setUser(false);
        }
    });

    if (user && dbData) {
        console.log(dbData);
        const listItems = dbData.map((doc) =>
            <ListItem>Name: {doc.Name}. Address: {doc.Address}. Email: {doc.Email}</ListItem>
        );
        return <List>
            {listItems}
        </List>;
    }
    else {
        return (
            <div></div>
        );
    }
}