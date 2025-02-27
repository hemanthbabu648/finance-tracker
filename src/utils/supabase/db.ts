import { cookies } from "next/headers";
import { supabaseAdmin } from "./supabaseAdmin";

export const getAuthToken = async () => {
    const cookieStore = await cookies();
    const authTokenKey = "sb-veqsuhtqmqqtehmazdyb-auth-token";
    const encodedSupabaseToken = cookieStore.get(authTokenKey)?.value;

    if (!encodedSupabaseToken) {
        return null;
    }

    const decodedToken = Buffer.from(encodedSupabaseToken.split("base64-")[1] ?? "", "base64").toString("utf-8");
    const tokenObject = JSON.parse(decodedToken);

    return tokenObject.access_token;
}
// TODO: add return type : Promise<User | null>
export const getAuthUserDetails = async () => {
    const token = await getAuthToken();

    if (!token) {
        return null;
    }

    const { data: { user }, error } = await supabaseAdmin.auth.getUser(token);

    if (error || !user) {
        return null;
    }

    return user;
}
