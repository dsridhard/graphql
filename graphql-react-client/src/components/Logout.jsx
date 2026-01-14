export default function Logout({onLogout}){
    const handleLogout = () => {
        localStorage.removeItem("token")
        onLogout(null)
    }
    return(
        <button onClick={handleLogout}>Logout</button>
    )
}