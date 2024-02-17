import { Link } from "react-router-dom";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { supabase } from "../config/supabaseClient";

interface Smoothie {
    id: number;
    title: string;
    method: string;
    rating: number;
}

export interface SmoothieCardProps {
    smoothie: Smoothie;
}

export function SmoothieCard({ smoothie }: SmoothieCardProps) {
    const { id, title, method, rating } = smoothie;

    const handleDelete = async () => {
        const { data, error } = await supabase
            .from("smoothies")
            .delete()
            .eq("id", id)
            .select();

        if (error) {
            console.log(error);
            alert("There was an error deleting the smoothie recipe");
        }

        if (data) {
            alert("Smoothie recipe deleted successfully");
        }
    };

    return (
        <div className="smoothie-card">
            <h3>{title}</h3>
            <p>{method}</p>
            <div className="rating">{rating}</div>
            <div className="buttons">
                {/* Link to Update */}
                <Link to={"/" + id}>
                    <FaEdit size={16} color="blue" />
                </Link>
                {/* Delete */}
                <FaTrashAlt onClick={handleDelete} size={16} color="red" />
            </div>
        </div>
    );
}
