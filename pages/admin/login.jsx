const AdminLogin = () => null;

export function getServerSideProps() {
  return { redirect: { destination: "/admin/portfolio", permanent: false } };
}

export default AdminLogin;
