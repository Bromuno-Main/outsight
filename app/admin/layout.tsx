import Sidebar from "@/components/Sidebar";
import AdminHeader from "@/components/AdminHeader";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="min-h-screen flex bg-gray-50">
            <Sidebar />
            <div className="flex-1 flex flex-col">
                <AdminHeader />
                <main className="p-4 flex-1 overflow-auto">{children}</main>
            </div>
        </div>
    );
}
