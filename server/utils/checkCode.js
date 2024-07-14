export const isSafe = (code) => {
    // Regular expression to match import statements
    const importRegex = /(import\s+\w+|from\s+\w+\s+import\s+\w+)/gm;
    
    // Check for other potentially dangerous keywords
    const dangerousKeywords = /\b(exec|eval|open|with|os\.|sys\.|subprocess\.|os\.system|os\.exec|import|from)\b/gm;

    // Check if code contains any import statements
    if (importRegex.test(code)) {
        console.log("Found an import statement");
        return false;
    }

    // Check for dangerous keywords
    if (dangerousKeywords.test(code)) {
        console.log("Found a dangerous keyword");
        return false;
    }

    return true;
}