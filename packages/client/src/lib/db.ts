import { Tip } from "../types";

const API_URL = "http://localhost:5002/api";

export async function getAllTips(): Promise<Tip[]> {
  const response = await fetch(`${API_URL}/tips`);
  if (!response.ok) {
    throw new Error("Failed to fetch tips");
  }

  const tips = await response.json();

  // Transform snake_case to camelCase
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return tips.map((tip: any) => ({
    id: tip.id,
    title: tip.title,
    description: tip.description,
    codeSnippet: tip.code_snippet,
    categories: tip.categories,
  }));
}

export async function addTip(tip: Omit<Tip, "id">) {
  const response = await fetch(`${API_URL}/tips`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: tip.title,
      description: tip.description,
      code_snippet: tip.codeSnippet,
      categories: tip.categories,
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to add tip");
  }

  return response.json();
}

export async function updateTip(id: string, tip: Omit<Tip, "id">) {
  const response = await fetch(`${API_URL}/tips/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: tip.title,
      description: tip.description,
      code_snippet: tip.codeSnippet,
      categories: tip.categories,
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to update tip");
  }

  return response.json();
}

export async function deleteTip(id: string) {
  const response = await fetch(`${API_URL}/tips/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Failed to delete tip");
  }

  return true;
}

export async function initDb() {
  try {
    // Health check to ensure API is working
    const response = await fetch(`${API_URL}/health`);
    if (!response.ok) {
      throw new Error("API not available");
    }
    console.log("Connected to API");
  } catch (error) {
    console.error("Failed to connect to API:", error);
    throw error;
  }
}

export async function reinitDb() {
  // This would need a specific endpoint on the server
  console.log(
    "Reinitialization functionality needs to be implemented on the server"
  );
}

// No need for window.tipsDb anymore
