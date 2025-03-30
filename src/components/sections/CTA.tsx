import { Button } from "@/components/ui/button";

export default function CTA() {
    return (
        <section className="py-20 text-center bg-gradient-to-b from-green-100 to-green-200">
            <h2 className="text-3xl font-semibold mb-4">Boost Productivity Today</h2>
            <p className="mb-6">
                Join thousands of users who manage tasks effortlessly
            </p>
            <Button
              className="bg-green-400 px-6 py-7 text-lg rounded-md shadow-lg hover:bg-green-500 cursor-pointer"
            >
                Try Taskify Free
            </Button>
        </section>
    )
}