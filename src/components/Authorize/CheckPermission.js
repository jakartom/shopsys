export default function checkPermission(auth, requiredAuth) {
    if (!requiredAuth
        || !auth
        || !requiredAuth instanceof Array
        || ! typeof (auth) === "string")
        return false;
    return requiredAuth.includes(auth);
}