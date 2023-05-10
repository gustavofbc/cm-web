import { signOut, useSession } from "next-auth/react";
import { useEffect } from "react";

export const withAuth = (WrappedComponent: any) => {
  const WithAuth = (props: any) => {
    const { data: session } = useSession();
    useEffect(() => {
      console.log(session);
    }, [session]);

    return <WrappedComponent {...props} />;
  };
  return WithAuth;
};

export async function getStaticProps(context: any) {
  console.log("Server side rendering");
  return {
    props: {},
  };
}
