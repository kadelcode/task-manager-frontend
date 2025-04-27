import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function CTA() {
    return (
        <section className="bg-[#b9f8cf] py-20 text-center bg-gradient-to-b from-green-100 to-green-200">
            <h2 className="text-3xl font-semibold mb-4">Boost Productivity Today</h2>
            <p className="mb-6">
                Join thousands of users who manage tasks effortlessly
            </p>

            <Link href="/dashboard">
            <Button
              className="bg-[#05df72] text-[#fff] px-6 py-7 text-lg rounded-md shadow-lg hover:bg-green-500 cursor-pointer"
            >
                Try Taskify Free
            </Button>
            </Link>
        </section>
    )
}