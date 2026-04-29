// backend/controllers/repoController.js

export const buildRepoContext = async (req, res) => {
  const { repoFullName, githubToken } = req.body;

  try {
    // 1. Fetch the recursive file tree from GitHub
    const treeUrl = `https://api.github.com/repos/${repoFullName}/git/trees/HEAD?recursive=1`;
    const treeRes = await fetch(treeUrl, {
      headers: { Authorization: `Bearer ${githubToken}` }
    });

    if (!treeRes.ok) throw new Error("Failed to fetch repository structure");
    const treeData = await treeRes.json();

    // 2. Filter for meaningful code files only
    // We ignore node_modules, images, and only take common code extensions
    const codeFiles = treeData.tree
      .filter(f => f.type === 'blob') // 'blob' means it's a file, not a folder
      .filter(f => /\.(js|jsx|ts|tsx|py|java|cpp|cs|go|rb|html|css)$/i.test(f.path))
      .filter(f => !f.path.includes('node_modules') && !f.path.includes('.git'))
      .slice(0, 15); // We take the first 15 files to stay safe with AI limits

    // 3. Fetch the content of each selected file
    const fileContents = await Promise.all(
      codeFiles.map(async (file) => {
        try {
          const contentRes = await fetch(file.url, {
            headers: { Authorization: `Bearer ${githubToken}` }
          });
          const data = await contentRes.json();
          
          // GitHub returns content in Base64, we must decode it to UTF-8
          const decodedContent = Buffer.from(data.content, 'base64').toString('utf-8');
          
          return `--- FILE: ${file.path} ---\n${decodedContent.slice(0, 3000)}`; // Max 3000 chars per file
        } catch (err) {
          return `--- FILE: ${file.path} ---\n(Could not read file content)`;
        }
      })
    );

    // 4. Combine everything into one context string
    const finalContext = fileContents.join('\n\n');

    res.json({
      success: true,
      context: finalContext,
      fileList: codeFiles.map(f => f.path)
    });

  } catch (error) {
    console.error("Repo Context Error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};
