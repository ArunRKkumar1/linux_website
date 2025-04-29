
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-terminal-dark p-4">
      <div className="text-center max-w-md">
        <div className="inline-block p-6 border border-terminal-green/30 rounded-lg bg-terminal-dark/50 mb-6">
          <pre className="text-terminal-green text-4xl font-mono">404</pre>
        </div>
        <h1 className="text-4xl font-bold mb-4 text-terminal-white">Page Not Found</h1>
        <p className="text-xl text-terminal-white/60 mb-8">
          The command you entered couldn't be found. Please check your syntax and try again.
        </p>
        <Button className="bg-terminal-green text-terminal-dark hover:bg-terminal-green/90" asChild>
          <Link to="/" className="flex items-center">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Return to Home
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
