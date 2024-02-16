import { supabase } from "../config/supabaseClient"
import { Link } from "react-router-dom"

export default function Home() {
    return (
        <nav>
            <ul>
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/create">Create</Link>
                </li>
                <li>
                    <Link to="/update">Update</Link>
                </li>
            </ul>
        </nav>
    )
}
