import { sql } from "@vercel/postgres";

export default async function Cart({
  params
} : {
  params: { user: string }
}): Promise<JSX.Element> {
  const { rows } = await sql`SELECT * from games`;
  const regex = /Grand Theft Auto V/i;

  return (
    <div>
      {rows.map((row) => (
        <div key={row.id}>
            {row.name.includes("Assassin’s Creed") &&(
                row.name
            )}
        </div>
      ))}
    </div>
  );
}