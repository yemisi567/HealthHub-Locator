export function convertToTextEditorCustomJSON(inputText: string) {
  try {
    // Try parsing the input to check if it's already in the desired format
    const parsedData = JSON.parse(inputText);
    if (parsedData && Array.isArray(parsedData.blocks)) {
      // If it's already in the desired format, return it as is
      return inputText;
    }
  } catch (error) {
    // Parsing failed, indicating it's not in the desired format
  }
  // Create a new JSON structure with the specified replacement text
  const jsonData = {
    blocks: [
      {
        key: "",
        text: inputText,
        type: "unstyled",
        depth: 0,
        inlineStyleRanges: [],
        entityRanges: [],
        data: {},
      },
    ],
    entityMap: {},
  };

  // Convert the JSON structure to a string with proper formatting
  const jsonString = JSON.stringify(jsonData, null, 0);
  return jsonString;
}
