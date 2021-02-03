import { useState } from 'react';

export function useUser() {
    let oldUser = undefined;
    try {
        let res = window.localStorage.getItem(process.env.REACT_APP_AUTH ? process.env.REACT_APP_AUTH : "XXX");
        oldUser = JSON.parse(res ? res : "null")
    } catch (e) {
        oldUser = false;
    }
    return (useState(oldUser));
}