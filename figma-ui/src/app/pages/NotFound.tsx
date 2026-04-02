import { Link } from "react-router";
import { FileQuestion } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-6">
      <div className="w-24 h-24 rounded-full bg-secondary flex items-center justify-center mb-6">
        <FileQuestion className="w-12 h-12 text-muted-foreground" />
      </div>
      <h2 className="text-2xl font-semibold mb-2">页面不存在</h2>
      <p className="text-muted-foreground mb-8 text-center">
        抱歉，您访问的页面不存在
      </p>
      <Link
        to="/"
        className="px-6 py-3 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
      >
        返回首页
      </Link>
    </div>
  );
}
