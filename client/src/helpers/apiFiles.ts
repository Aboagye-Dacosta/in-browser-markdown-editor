import { File } from "../entities";
const BASE_URL = import.meta.env.VITE_BASE_URL;


export async function apiCreateFile({ pathName, fileId, content, createdAt }: File) {
  const response = await fetch(`${BASE_URL}/files`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({ pathName, fileId, content, createdAt }),
  });

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  return response.json();
}

export async function apiGetFiles() {
  const response = await fetch(`${BASE_URL}/files`);

  if (response.status !== 200) {
    throw new Error(response.statusText);
  }

  return response.json();
}

export async function apiDeleteFile(file: File) {
  const response = await fetch(`${BASE_URL}/files/${file.fileId}`, {
    method: "Delete",
    headers: {
      "content-type": "application/json",
    },
  });


  if (response.status !== 201) {
    throw new Error("Could not delete file");
  }

  return response.json();
}

export async function apiUpdateFile(file: File) {
  const response = await fetch(`${BASE_URL}/files/${file.fileId}`, {
    method: "Put",
    body: JSON.stringify(file),
    headers: {
      "content-type": "application/json",
    },
  });

  if (response.status !== 202) {
    throw new Error(response.statusText);
  }

  return response;
}
