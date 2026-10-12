# Lakshya Tech Park — a 3D office building website

Walk into a five-floor office building, tell the concierge who you're visiting, and the guide takes you to their floor. One HTML file, Three.js, no build step.

- **Live demo:** `https://<your-github-username>.github.io/lakshya-tech-park/`
- **Get the code + prompt page (what the Instagram DM links to):** `https://<your-github-username>.github.io/lakshya-tech-park/get/`
- **The prompt pack:** [PROMPT.md](PROMPT.md)

## Run it locally

Any static server works. The character files are loaded with `fetch`, so opening `index.html` straight from the file system will not load the people.

```bash
python3 -m http.server 8080
# then open http://localhost:8080
```

## Files

| File | What it is |
| --- | --- |
| `index.html` | The whole site: scene, textures, navigation, UI |
| `anims.b64.txt`, `man.b64.txt`, `woman.b64.txt` | Base64 GLB files: a Mixamo animation set and two rigged characters |
| `get/index.html` | The "follow, then get the code" landing page used in the Instagram DM |
| `PROMPT.md` | The prompts that produce this site in Claude |

## Publish on GitHub Pages (once)

```bash
git init && git add . && git commit -m "Lakshya Tech Park 3D office website"
gh repo create lakshya-tech-park --public --source=. --push
# or: create the repo on github.com, then  git remote add origin <url> && git push -u origin main
```

Then on GitHub: **Settings → Pages → Build and deployment → Source: Deploy from a branch → Branch: main / (root) → Save.** The site is live at `https://<username>.github.io/lakshya-tech-park/` in a minute or two. Replace `REPLACE_WITH_YOUR_GITHUB` in `get/index.html` with your username before pushing.

All companies, people and the building are fictional. Made by LakshyaAI Studio, Tirupati & Bengaluru.
