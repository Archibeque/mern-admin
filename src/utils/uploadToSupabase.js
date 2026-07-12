import supabase from "../supabase";

/**
 * Uploads a file to Supabase Storage and returns the public URL.
 * @param {File} file - The file to upload
 * @param {string} bucket - The storage bucket name (e.g. "products", "users")
 * @returns {Promise<string>} public URL of the uploaded file
 */
export const uploadToSupabase = async (file, bucket = "products") => {
  const fileName = `${Date.now()}-${file.name.replace(/\s+/g, "_")}`;

  const { error } = await supabase.storage
    .from(bucket)
    .upload(fileName, file, { upsert: false });

  if (error) throw new Error(error.message);

  const { data } = supabase.storage.from(bucket).getPublicUrl(fileName);

  return data.publicUrl;
};
