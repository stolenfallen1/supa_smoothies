export interface SmoothieCardProps {
    title: string;
    method: string;
    rating: number;
}

export function SmoothieCard({ title, method, rating }: SmoothieCardProps) {
    return (
        <div className="smoothie-card">
            <h3>{title}</h3>
            <p>{method}</p>
            <div className="rating">{rating}</div>
        </div>
    )
}  