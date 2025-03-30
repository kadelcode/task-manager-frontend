const tools = [
    "Slack",
    "Google Calendar",
    "Trello",
]

export default function Integrations() {
    return (
        <section className="py-20 bg-white text-center">
            <h2 className="text-3xl font-bold">Seamless Integrations</h2>
            <p className="text-gray-600 mt-3">Works with your favorite tools.</p>
            <div className="flex justify-center gap-6 mt-6">
                {tools.map((tool, index) => (
                    <img
                      key={index} 
                      src={`/logos/${tool.toLowerCase().replace(/ /g, '-')}.svg`}
                      alt={tool}
                      className="h-12 transition-transform hover:scale-110" />
                ))}
            </div>
        </section>
    );
};