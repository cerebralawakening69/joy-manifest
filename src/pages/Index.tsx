import ManifestationQuiz from "./ManifestationQuiz";

const Index = () => {
  return (
    <div className="relative">
      <ManifestationQuiz />
      {/* Admin access link - only visible on hover */}
      <a 
        href="/admin" 
        className="fixed bottom-4 right-4 opacity-0 hover:opacity-100 transition-opacity duration-300 text-xs text-muted-foreground hover:text-foreground bg-background/80 backdrop-blur-sm px-2 py-1 rounded border"
        title="Admin Dashboard"
      >
        Admin
      </a>
    </div>
  );
};

export default Index;
