import { useState } from "react";
export default function ScrapeRecipeForm({ onScrape }) {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    const res = await fetch("http://localhost:5000/api/scrape", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url }),
    });
    const data = await res.json();
    setLoading(false);
    onScrape(data);
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="url"
        placeholder="Paste recipe URL"
        value={url}
        onChange={e => setUrl(e.target.value)}
        required
      />
      <button type="submit" disabled={loading}>
        {loading ? "Scraping..." : "Import Recipe"}
      </button>
    </form>
  );
}
