import { useEffect, useState, useCallback } from "react";
import { db } from "../Firebase/firebase";
import { useUser } from "./useUser";

/**
 * This hook gets the profile of a user from a firebase collection
 * @param defaultValue - Any default value
 * @param onData - A function that receives the data as a parameter
 */
export function useUserProfile(defaultValue: any | null, onData: Function) {
    const [user] = useUser();
    const [data, setData] = useState(defaultValue);
    const onDataCallback = useCallback((...args: any[]) => onData(args), [onData])

    useEffect(() => {
        if (user !== undefined) {
            db.collection("users").doc(user.uid).onSnapshot(function(doc) {
                setData({id: user.uid, ...doc.data()});
                onDataCallback({id: user.uid, ...doc.data()});
            })
        }
    // eslint-disable-next-line
    }, [])
    return (data);
}