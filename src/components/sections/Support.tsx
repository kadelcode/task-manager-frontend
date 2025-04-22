import { Button } from "@/components/ui/button";

export default function Support() {
    return (
        <section className="py-20 bg-white text-center">
            <h2 className="text-3xl font-bold">Need Help?</h2>
            <p className="text-gray-600 mt-3">Contact our support team anytime.</p>
            <div className="mt-6">
                <Button className="px-6 py-7 text-lg text-white bg-[#05df72] hover:bg-[#00c951]">
                    Contact Support
                </Button>
            </div>
        </section>
    )
}