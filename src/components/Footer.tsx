import Link from "next/link";

export default function Footer() {
    return (
        <footer className="bg-[#e5e7eb] text-[#1e2939] py-12 mt-16">
            <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
                <div>
                    <h3 className="text-xl font-semibold mb-2">
                        TaskSpark
                    </h3>
                    <p className="text-[#364153]">
                        Effectively manage your tasks.
                    </p>
                </div>

                {/*Quick Links*/}
                <div>
                    <h4 className="font-semibold mb-2">Quick Links</h4>
                    <ul className="space-y-2 text-[#364153]">
                        <li><Link href="/">Home</Link></li>
                        <li><Link href="#features">Features</Link></li>
                        <li><Link href="#plans">Pricing</Link></li>
                        <li><Link href="/login">Login</Link></li>
                    </ul>
                </div>

                {/* Social Links */}
                <div>
                    <h4 className="font-semibold mb-2">Follow Us</h4>
                    <ul className="space-y-2 text-[#364153]">
                        <li><a href="#" target="_blank">Instagram</a></li>
                        <li><a href="#" target="_blank">YouTube</a></li>
                        <li><a href="#" target="_blank">Twitter</a></li>
                    </ul>
                </div>
            </div>

            <div className="text-center text-[#1e2939] mt-8 text-sm">
                &copy; {new Date().getFullYear()} TaskSpark. All rights reserved.
            </div>
        </footer>
    )
}