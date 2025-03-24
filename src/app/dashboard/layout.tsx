import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex h-screen">
            {/* Sidebar (Fixed to the left) */}
            <Sidebar />
            
            {/* Main Content (Takes Remaining Space) */}
            <main className="w-full md:flex-1 overflow-auto">
                <Navbar />
                {children}
            </main>
        </div>
    )
};