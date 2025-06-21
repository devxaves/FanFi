import { CivicAuthProvider } from "@civic/auth/react";
import UserRoutes from "./routes/UserRoutes";

function App() {
  return (
    <CivicAuthProvider clientId="bbc87140-27ea-4cd5-aa0e-e25daa0f3c23">
      <UserRoutes />
    </CivicAuthProvider>
  );
}

export default App;
