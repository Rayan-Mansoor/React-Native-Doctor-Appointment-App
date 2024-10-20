const BASE_URL = "192.168.0.110:9090"

export async function extractPersonNames(text: string): Promise<string[]> {
  try {
    const response = await fetch(
      `http://${BASE_URL}/api/extract-names`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            "text": text
        }),
      }
    );

    if(response.ok){
        const result = await response.json()
        return result.names
    } else {
        console.error('Error: Failed to fetch person names', response.status);
        return [];
    }

  } catch (error) {
    console.error('Error: An exception occurred', error);
    return [];
  }
}