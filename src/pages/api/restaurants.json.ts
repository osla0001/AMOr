// src/pages/api/restaurants.json.ts
// Complete restaurant data export for Unity integration
import type { APIRoute } from "astro";
import mysql from "mysql2/promise";

// Connection to Cloud SQL
const db = await mysql.createPool({
  host: import.meta.env.DB_HOST || "34.175.101.196",
  port: Number(import.meta.env.DB_PORT || "3306"),
  user: import.meta.env.DB_USER || "root",
  password: import.meta.env.DB_PASSWORD || 'MvbsQB4|"Otq$\\d8',
  database: import.meta.env.DB_NAME || "munchmap",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

export const GET: APIRoute = async () => {
  try {
    // Fetch ALL restaurant data with complete information
    const [rows] = await db.query(`
      SELECT 
        e.etr_id,
        e.etr_name,
        e.etr_coordinates,
        e.etr_address,
        e.etr_menu_highlights,
        e.etr_lgbt_friendly,
        e.etr_women_owned,
        e.etr_price_range,
        e.etr_outdoor_seating,
        e.etr_pet_friendly,
        e.etr_wifi,
        e.etr_payment_methods,
        e.etr_local_suppliers,
        e.etr_opening_hours,
        e.etr_bg_stry,
        e.etr_phone,
        e.etr_email,
        c.cus_name
      FROM eatery e
      LEFT JOIN eatery_cuisine ec ON e.etr_id = ec.etrc_etr_id
      LEFT JOIN cuisine c ON ec.etrc_cus_id = c.cus_id
      ORDER BY e.etr_id
    `);

    // Group data by restaurant ID to avoid duplicates from JOIN
    const restaurantsMap = new Map();

    (rows as any[]).forEach((row) => {
      if (!restaurantsMap.has(row.etr_id)) {
        // Parse coordinates
        const [lat, lng] = row.etr_coordinates
          ? row.etr_coordinates.split(",").map(Number)
          : [0, 0];

        // Parse menu highlights JSON
        let menuHighlights = [];
        try {
          if (row.etr_menu_highlights) {
            menuHighlights = JSON.parse(row.etr_menu_highlights);
          }
        } catch (e) {
          console.error(`Failed to parse menu for restaurant ${row.etr_id}`);
        }

        // Create restaurant object with all data
        restaurantsMap.set(row.etr_id, {
          id: row.etr_id,
          name: row.etr_name,
          address: row.etr_address || "No address",
          coordinates: {
            latitude: lat,
            longitude: lng,
          },
          cuisines: [],
          menu_highlights: menuHighlights,
          amenities: {
            lgbt_friendly: Boolean(row.etr_lgbt_friendly),
            women_owned: Boolean(row.etr_women_owned),
            outdoor_seating: Boolean(row.etr_outdoor_seating),
            pet_friendly: Boolean(row.etr_pet_friendly),
            wifi: Boolean(row.etr_wifi),
            local_suppliers: Boolean(row.etr_local_suppliers),
          },
          price_range: row.etr_price_range || "Not specified",
          payment_methods: row.etr_payment_methods || "Not specified",
          opening_hours: row.etr_opening_hours || "Not available",
          background_story: row.etr_bg_stry || "Not available",
          contact: {
            phone: row.etr_phone || "Not available",
            email: row.etr_email || "Not available",
          },
        });
      }

      // Add cuisine if it exists and hasn't been added already
      if (
        row.cus_name &&
        !restaurantsMap.get(row.etr_id).cuisines.includes(row.cus_name)
      ) {
        restaurantsMap.get(row.etr_id).cuisines.push(row.cus_name);
      }
    });

    // Convert to array and format for Unity
    const restaurants = Array.from(restaurantsMap.values()).map(
      (restaurant) => ({
        ...restaurant,
        cuisines:
          restaurant.cuisines.length > 0
            ? restaurant.cuisines
            : ["Not specified"],
      }),
    );

    // Return complete JSON with metadata
    const response = {
      metadata: {
        total_count: restaurants.length,
        generated_at: new Date().toISOString(),
        version: "1.0",
        source: "AMOr Database",
      },
      restaurants: restaurants,
    };

    return new Response(JSON.stringify(response, null, 2), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
        "Cache-Control": "public, max-age=60", // Cache for 1 minute
      },
    });
  } catch (error) {
    console.error("Database error:", error);
    return new Response(
      JSON.stringify({
        error: "Database connection failed",
        message: error instanceof Error ? error.message : "Unknown error",
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      },
    );
  }
};

// Handle OPTIONS request for CORS preflight
export const OPTIONS: APIRoute = async () => {
  return new Response(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
};
