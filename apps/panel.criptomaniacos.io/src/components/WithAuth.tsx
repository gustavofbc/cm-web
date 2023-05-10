import { signOut, useSession, getSession } from "next-auth/react";
import { ReactNode, useEffect } from "react";

export async function authMiddleware(context: any) {
    const session = await getSession(context);

    if (!session) {
        return {
            redirect: {
                destination: "/login",
                permanent: false,
            },
        };
    }

    return {
        props: {
            session,
        },
    };
}
