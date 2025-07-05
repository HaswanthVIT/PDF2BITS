# PDF2BITS

**Bite-Sized PDF Summaries for Exam Prep — TikTok-Style**

PDF2BITS is an AI-powered web app that transforms any educational PDF into a scrollable feed of concise, exam-focused summaries. Upload a PDF, and instantly receive the most useful, bite-sized explanations—perfect for revision and quick study.

## Features

- **PDF Upload:** Drag-and-drop or select your PDF to get started.
- **Automatic Text Extraction:** Robust, multi-method extraction for maximum accuracy.
- **AI Summarization:** Each section is summarized into a 10-word, exam-relevant statement using a fine-tuned Llama 3.2B model.
- **TikTok-Style UI:** Summaries are displayed as vertically scrollable cards, optimized for mobile and desktop.
- **Fast & Memory-Efficient:** Designed for Google Colab’s free GPU tier, with efficient model loading and chunked processing.
- **Educational Focus:** Summaries are filtered for clarity, format, and exam usefulness.

## Quick Start

### 1. Clone the Repository


### 2. Backend: Google Colab Setup

- Open `PDF2BITSfinetuning.ipynb` in Google Colab.
- Ensure GPU (T4) is enabled.
- Install dependencies:
!pip install unsloth trl<0.9.0 peft accelerate bitsandbytes xformers datasets pdfplumber PyPDF2 flask flask-ngrok flask-cors

- Run all cells to:
- Mount Google Drive (for model checkpoints)
- Load the fine-tuned model (Llama 3.2-3B, 4-bit, LoRA)
- Start the Flask API server with ngrok tunnel

### 3. Frontend: React App

- Go to the `frontend/` directory.
- Install dependencies and start the app:
npm install
npm start


- Update the API endpoint in `src/services/api.js` to match your Colab/ngrok URL.

## Project Structure

| Folder/File            | Purpose                                           |
|------------------------|--------------------------------------------------|
| `backend/`             | Colab notebook, Flask API, PDF extraction/model  |
| `frontend/`            | React app for TikTok-style summary cards         |
| `datasets/`            | Educational dataset for fine-tuning              |
| `models/`              | Model configs/checkpoints (if small)             |
| `docs/`                | Guides, diagrams, research PDFs                  |
| `requirements.txt`     | Python backend dependencies                      |
| `README.md`            | This file                                        |

## How It Works

1. **Upload PDF:** User uploads a PDF via the web UI.
2. **Text Extraction:** Backend extracts and cleans PDF text using both `pdfplumber` and `PyPDF2` for reliability.
3. **Chunking:** Text is split into semantic chunks (50–150 words).
4. **Summarization:** Each chunk is summarized into a 10-word, exam-focused statement using a fine-tuned Llama 3.2B model (Unsloth, 4-bit, LoRA).
5. **Quality Filtering:** Summaries are checked for format, educational value, and clarity.
6. **UI Display:** Summaries are sent to the frontend and displayed as scrollable cards.

## Example API Response
{
"success": true,
"summaries": [
"Plants convert sunlight carbon dioxide water into glucose and oxygen.",
"DNA contains genetic instructions using four complementary nucleotide base pairs.",
"Cells break down glucose producing ATP energy currency in mitochondria."
],
"total_chunks": 3,
"pdf_length": 1500
}



### Frontend (React)

Key dependencies:

- `react`
- `axios`
- `framer-motion`
- `react-dropzone`

## Dataset

- Format: JSON, instruction-following (input text + 10-word summary)
- Example: See `datasets/pdf2bits_complete_500_dataset.json`

## Deployment

- **Backend:** Run Colab notebook, expose Flask API via ngrok.
- **Frontend:** Deploy React app to Vercel, Netlify, or GitHub Pages.
- For production, consider moving backend to a cloud server with GPU.

## Troubleshooting

- **CORS errors:** Ensure Flask app uses `flask-cors`.
- **API timeout:** Increase timeout for large PDFs in frontend API calls.
- **Model memory:** Use T4 GPU (Colab) and 4-bit quantization for best results.

## Contributing

Pull requests and issues are welcome! Please open an issue for bugs, feature requests, or questions.

## License

MIT License

## Acknowledgments

- Model fine-tuning powered by [Unsloth](https://github.com/unslothai/unsloth)
- Inspired by TikTok/Instagram UI for educational content delivery

**PDF2BITS — Study Smarter, Not Harder!**



