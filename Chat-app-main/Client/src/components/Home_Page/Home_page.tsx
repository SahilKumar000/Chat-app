import { ThemeProvider } from "@/components/theme-provider";
import { SiteHeader } from "@/components/site-header";
import Form from "./Form";
import Groups from "./Groups";

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <SiteHeader />
      </ThemeProvider>

      <div className="flex flex-row flex-grow">
        <Groups />
        <Form />
      </div>
    </div>
  );
}
