import React, { ReactNode, createContext, useEffect, useState } from "react";
import firebase from "../firebaseConfig";
import axios from 'axios';
export interface AuthContextModel {
	user: firebase.User | null;
}

const defaultValue: AuthContextModel = {
	user: null,
};

export const AuthContext = createContext(defaultValue);

export function AuthContextProvider({ children }: { children: ReactNode }) {
	const [user, setUser] = useState<firebase.User | null>(null);
	console.log({ user });
	useEffect(() => {
		return firebase.auth().onAuthStateChanged((newUser) => {
			setUser(newUser);
			axios.post('http://localhost:8080/sluber/createaccount', {
				userId: newUser?.uid,
				name: newUser?.displayName,
				phonenumber: newUser?.phoneNumber,
				email: newUser?.email
			}).then((response) => console.log(response.data)).catch((error) => console.log(error));
			
		});
	}, []);

	return <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>;
}
