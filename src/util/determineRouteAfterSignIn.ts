import { useHistory } from "react-router";
import { useContext } from "react";
import { AuthContext } from "../context/auth-context";


export function determineRouteAfterSignIn() {
    const history = useHistory();
    const { user } = useContext( AuthContext );
    user.uid ? history.push('/findRidePage') : history.push('/account')
}