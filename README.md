Blog Dashboard with Text and Video Input 🌐
About the Project 📝
This Blog Dashboard allows users to input text and video content for seamless transcription, translation, and blog publishing in 10 regional Indian languages:
Hindi, Marathi, Gujarati, Tamil, Kannada, Telugu, Bengali, Malayalam, Punjabi, and Odia.

Built for the Level Supermind Hackathon, this tool combines advanced speech recognition and translation technologies with a user-friendly interface for blog management.

Features 🚀
Input Options
Text Input

Direct text entry or upload .txt and .docx files.
Video Input

Upload videos (.mp4, .mov) for transcription and translation.
Audio Input

Directly upload audio tracks for transcription.
Workflow 🔄
Video Input
User uploads a video, which is store…
[7:48 am, 19/1/2025] Jatin: The Blog Dashboard is a cutting-edge platform developed to simplify the process of creating, transcribing, translating, and publishing blogs in 10 regional Indian languages: Hindi, Marathi, Gujarati, Tamil, Kannada, Telugu, Bengali, Malayalam, Punjabi, and Odia. Built for the Level Supermind Hackathon, this tool is tailored to enhance inclusivity and provide a seamless multilingual blogging experience. The system allows users to input content through multiple formats, including direct text entry, audio uploads, and video uploads, ensuring flexibility for diverse content creation needs. The platform's user-friendly interface and powerful backend make it a robust solution for efficient blog management.

For video inputs, the platform leverages Cloudinary to st…
[7:52 am, 19/1/2025] Jatin: {
    "error": "Google Speech Recognition could not understand the audio"
}
[8:24 am, 19/1/2025] Jatin: # Blog Dashboard with Text and Video Input 🌐

## About the Project 📝
This *Blog Dashboard* allows users to input text and video content for seamless transcription, translation, and blog publishing in *10 regional Indian languages*:
- Hindi
- Marathi
- Gujarati
- Tamil
- Kannada
- Telugu
- Bengali
- Malayalam
- Punjabi
- Odia

Built for the *Level Supermind Hackathon*, this tool combines advanced speech recognition and translation technologies with a user-friendly interface for efficient blog management.

---

## Features 🚀

### Input Options
- *Text Input*
  - Direct text entry or upload .txt and .docx files.
- *Video Input*
  - Upload videos (.mp4, .mov) for transcription and translation.
- *Audio Input*
  - Directly upload audio tracks for transcription.

---

## Workflow 🔄

### Video Input
1. User uploads a video, which is stored in *Cloudinary*.
2. Backend fetches the video file and uses movie.py to extract audio.
3. Speech recognition converts the extracted audio to English text.

### Text & Audio Input
1. Uploaded files (text, PDFs, docs, or audio) are stored in *Cloudinary*.
2. Speech recognition (for audio) or direct parsing (for text) generates English content.

### Translation
- English content is translated into 10 regional Indian languages using *NLP tools*.
- Translation accuracy is measured using *ROUGE scores*.

### Publishing
- Translations are presented as blog drafts for review.
- Published blogs are dynamically routed with language-specific URLs:
  - Example: /blog-title-hindi, /blog-title-tamil.
- Blogs are *SEO-optimized* with metadata, structured data, and language tags.

---

## Technology Stack 🛠️

### Frontend
- *React.js*
- *Tailwind CSS*

### Backend
- *Appwrite* (for user authentication and backend services)

### Media Storage
- *Cloudinary* (for storing videos, audio, and images)

### Processing
- movie.py (for audio extraction from videos)
- *SpeechRecognition library* (for speech-to-text conversion)
- *Translation Libraries* (for translating content to regional languages)
