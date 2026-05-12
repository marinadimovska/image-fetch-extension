import { getRandomDogImage } from "../../service/random-dog.service";
import { usePopupStore } from "../../store/popup.store";
import "./popup.css";

export default function Popup() {
    const {
    imageUrl,
    lastFetchedAt,
    loading,
    error,
    setImageUrl,
    setLastFetchedAt,
    setLoading,
    setError
  } = usePopupStore(); 

  const handleFetchImage = async (): Promise<void> => {
    setLoading(true);
    setError("");

    try {
      const response = await getRandomDogImage();

      setImageUrl(response.url);
      setLastFetchedAt(new Date().toLocaleString());
    } catch {
      setError("Failed to fetch image.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="popup">
      <h1>Image fetch extension</h1>

      {lastFetchedAt && (
        <p className="timestamp">
          Last fetched: <strong>{lastFetchedAt}</strong>
        </p>
      )}

      <button className="btn" onClick={handleFetchImage} disabled={loading}>
        {loading ? "Fetching..." : "Fetch image"}
      </button>

      {error && <p className="error">{error}</p>}

      {imageUrl && (
        <img src={imageUrl} alt="Random dog" className="dog-image" />
      )}
    </main>
  );
}