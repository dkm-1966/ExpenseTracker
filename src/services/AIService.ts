class AIService {
    async analyze(data: string, message: string) {
      try {
        const response = await fetch(
          "https://openrouter.ai/api/v1/chat/completions",
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${process.env.API_KEY}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              model: "deepseek/deepseek-r1:free",
              messages: [
                {
                  role: "user",
                  content: `${message} ${data}`,
                },
              ],
            }),
          }
        );
  
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
  
        return await response.json();
      } catch (e) {
        console.error("Error:", e);
      }
    }
  }
  
  export default new AIService();
  