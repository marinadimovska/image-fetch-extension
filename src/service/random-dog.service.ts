const RANDOM_DOG_API_URL = "https://random.dog/woof.json";

type RandomDogResponse = {
  fileSizeBytes: number;
  url: string;
};


const IMAGE_EXTENSIONS = [".jpg", ".jpeg", ".png"] as const;

const isImageUrl = (url: string): boolean => {
  return IMAGE_EXTENSIONS.some((extension) =>
    url.toLowerCase().endsWith(extension)
  );
};

export const getRandomDogImage = async (): Promise<RandomDogResponse> => {
  while (true) {
    const response = await fetch(RANDOM_DOG_API_URL);

    if (!response.ok) {
      throw new Error("Failed to fetch random dog image");
    }

    const data = (await response.json()) as RandomDogResponse;
    if (data.url && isImageUrl(data.url)) {
      return data;
    }
  }
};