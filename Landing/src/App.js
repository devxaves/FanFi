import UserRoutes from './routes/UserRoutes';
import { CivicAuthProvider, UserButton } from "@civic/auth/react";

function App() {
  return (
    <CivicAuthProvider clientId="bbc87140-27ea-4cd5-aa0e-e25daa0f3c23"> 
    <UserRoutes />
    </CivicAuthProvider>
  );
}

export default App;
