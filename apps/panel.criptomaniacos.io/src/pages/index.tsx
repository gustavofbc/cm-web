import { authMiddleware } from "../components/WithAuth";
import Home from "./home";

export default function Index() {
  return <Home />
}

export async function getServerSideProps(context: any) {
  return authMiddleware(context);
}