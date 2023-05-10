import { signOut, useSession, getSession } from "next-auth/react";
import { authMiddleware } from "../../components/WithAuth";
import Theme from "../../components/Theme";

function Home() {
  const { data: session } = useSession();

  return (
    <Theme>
      <div className="bg-darkImage h-full w-full">
        <h2 className="text-white text-3xl font-bold">Dashboard</h2>
      </div>
    </Theme>
  );
}

export default Home;

export async function getServerSideProps(context: any) {
  return authMiddleware(context);
}
