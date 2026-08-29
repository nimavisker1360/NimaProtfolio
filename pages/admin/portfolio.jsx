import Seo from "../../components/Seo";
import AdminPortfolioManager from "../../components/AdminPortfolioManager";
import { connectDatabase } from "../../lib/db";
import PortfolioItem from "../../models/PortfolioItem";

const AdminPortfolio = (props) => <><Seo page="creative" noindex /><AdminPortfolioManager {...props} /></>;

export async function getServerSideProps() {
  let items = [];
  let setupError = "";
  try {
    await connectDatabase();
    items = JSON.parse(JSON.stringify(await PortfolioItem.find({}).sort({ order: 1, createdAt: -1 }).lean()));
  } catch (error) { setupError = error.message; }
  return { props: { initialItems: items, csrfToken: "", setupError } };
}

export default AdminPortfolio;
