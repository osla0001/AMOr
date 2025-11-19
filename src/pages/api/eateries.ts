// src/pages/api/eateries.ts
// Flyt denne fil til src/pages/api/ i dit Astro projekt

import type { APIRoute } from "astro";
import mysql from "mysql2/promise";

// Connection til din Cloud SQL
const db = await mysql.createPool({
  host: "34.175.101.196",
  port: 3306,
  user: "root",
  password: 'MvbsQB4|"Otq$\\d8',
  database: "munchmap",
});

export const GET: APIRoute = async () => {
  try {
    const [rows] = await db.query(`
      SELECT 
        e.etr_id, 
        e.etr_name, 
        e.etr_coordinates,
        e.etr_address,
        c.cus_name
      FROM eatery e
      LEFT JOIN eatery_cuisine ec ON e.etr_id = ec.etrc_etr_id
      LEFT JOIN cuisine c ON ec.etrc_cus_id = c.cus_id
    `);

    // Gruppér cuisines for hver restaurant
    const eateriesMap = new Map();

    (rows as any[]).forEach((row) => {
      if (!eateriesMap.has(row.etr_id)) {
        const [lat, lng] = row.etr_coordinates.split(",").map(Number);
        eateriesMap.set(row.etr_id, {
          id: row.etr_id,
          name: row.etr_name,
          address: row.etr_address || "Ingen adresse",
          cuisines: [],
          coordinates: { latitude: lat, longitude: lng },
        });
      }

      // Tilføj cuisine hvis den findes og ikke allerede er tilføjet
      if (
        row.cus_name &&
        !eateriesMap.get(row.etr_id).cuisines.includes(row.cus_name)
      ) {
        eateriesMap.get(row.etr_id).cuisines.push(row.cus_name);
      }
    });

    // Konverter til array og lav cuisines til string
    const eateries = Array.from(eateriesMap.values()).map((e) => ({
      ...e,
      cus_name: e.cuisines.length > 0 ? e.cuisines.join(", ") : "Ikke angivet",
      cuisines: undefined,
    }));

    return new Response(JSON.stringify(eateries), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    });
  } catch (error) {
    console.error("Database error:", error);
    return new Response(
      JSON.stringify({ error: "Database connection failed" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      },
    );
  }
};
