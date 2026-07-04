import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";

dotenv.config();

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!
);
// function main() {
//   try {
//     const supabase = createClient(  
//       process.env.NEXT_PUBLIC_SUPABASE_URL!,
//       process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!
//     );
//     console.log("Supabase client created successfully:");
//   } catch (error) {
//     console.error("Error creating Supabase client:", error);
//   }
// }
// main();