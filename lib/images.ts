import { createServerSupabaseClient } from "@/lib/supabase"; // adjust path

// export async function getImage(imageName: string) {
//   const supabase = await createServerSupabaseClient();

//   const { data, error } = await supabase
//     .from("website_images")
//     .select("image_url")
//     .eq("image_name", imageName)
//     .single();

//   if (error) {
//     console.error(error);
//     return null;
//   }

//   return data.image_url;
// }

const supabase = await createServerSupabaseClient();

const { data } = await supabase
  .from("website_images")
  .select("*");

console.log();
