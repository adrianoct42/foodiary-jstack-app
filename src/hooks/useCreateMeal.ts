import { useMutation } from "@tanstack/react-query";
import * as FileSystem from "expo-file-system";
import { httpClient } from "../services/httpClient";
import { router } from "expo-router";

/*      
      const { uploadURL } = data;

      const response = await fetch(uri);
      const file = await response.blob();

      await fetch(uploadURL, {
        method: "PUT",
        body: file,
        headers: {
          "Content-Type": file.type,
        },
      }); 
*/

type CreateMealRespose = {
  uploadURL: string;
  mealId: string;
};

type CreateMealParams = {
  fileType: "image/jpeg" | "audio/m4a";
  onSuccess(mealId: string): void;
};

export function useCreateMeal({ fileType, onSuccess }: CreateMealParams) {
  const { mutateAsync: createMeal, isPending } = useMutation({
    mutationFn: async (uri: string) => {
      const { data } = await httpClient.post<CreateMealRespose>("/meals", {
        fileType,
      });

      await FileSystem.uploadAsync(data.uploadURL, uri, {
        httpMethod: "PUT",
        uploadType: FileSystem.FileSystemUploadType.BINARY_CONTENT,
      });
      return { mealId: data.mealId };
    },
    onSuccess: ({ mealId }) => {
      console.log("Meal criada!");
      onSuccess(mealId);
    },
  });
  return { createMeal, isLoading: isPending };
}
