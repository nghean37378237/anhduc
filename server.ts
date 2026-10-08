import express from 'express';
import { createServer as createViteServer } from 'vite';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const apiKey = process.env.GEMINI_API_KEY || '';
const ai = apiKey ? new GoogleGenAI({ apiKey }) : null;

async function startServer() {
  const app = express();
  app.use(express.json());

  // API Health
  app.get('/api/health', (_req, res) => {
    res.json({ status: 'ok', hasAi: Boolean(apiKey) });
  });

  // AI Caption & Quote suggestions
  app.post('/api/ai/suggest-caption', async (req, res) => {
    const { theme = 'Kỷ niệm mùa hè', tone = 'poetic', language = 'vi' } = req.body;

    if (!ai) {
      // Fallback aesthetic captions if no key is configured
      const fallbackCaptions = [
        { text: 'Lưu giữ từng khoảnh khắc dịu dàng của ngày hôm qua.', tag: 'Thơ mộng', author: 'Kroma Studio' },
        { text: 'Chậm lại một nhịp để thấy đời vẫn bình yên.', tag: 'Tối giản', author: 'Aesthetic' },
        { text: 'Golden hour & sweet memories that never fade.', tag: 'Song ngữ', author: 'Editorial' },
        { text: 'Gói trọn nắng hạ vào trong từng khung hình nhỏ.', tag: 'Cảm xúc', author: 'Summer' },
        { text: '‘98 MEMORIES · COLLECTED MOMENTS', tag: 'Vintage Stamp', author: 'Retro 35mm' },
        { text: 'Nơi có những nụ cười, nơi đó là nhà.', tag: 'Ấm áp', author: 'Life' },
      ];
      return res.json({ captions: fallbackCaptions, source: 'curated' });
    }

    try {
      const prompt = `Bạn là biên tập viên nghệ thuật chuyên về nhiếp ảnh và tạp chí phong cách sống.
Hãy tạo 6 câu trích dẫn/caption ngắn, giàu chất thơ, tinh tế và thẩm mỹ cao để in lên ảnh ghép nghệ thuật (collage poster/photo strip).
Chủ đề: "${theme}". Phong cách: "${tone}". Ngôn ngữ chính: ${language === 'vi' ? 'Tiếng Việt (kèm 1-2 câu tiếng Anh ngắn đậm chất tạp chí)' : 'Tiếng Anh'}.
Độ dài mỗi câu: dưới 15 từ, ngắn gọn, đắt giá, phù hợp làm typography trên ảnh.

Trả về duy nhất định dạng JSON thuần không có markdown code blocks, theo schema sau:
[
  { "text": "câu caption", "tag": "từ khóa phong cách (1-2 từ)", "author": "nguồn hoặc nhãn ngắn" }
]`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: prompt,
      });

      const rawText = response.text || '';
      const cleanJson = rawText.replace(/```json\n?|\n?```/g, '').trim();
      const parsed = JSON.parse(cleanJson);
      return res.json({ captions: parsed, source: 'gemini' });
    } catch (err: any) {
      console.error('Gemini API caption generation error:', err);
      // Fallback gracefully on any API error or quota issue
      const fallbackCaptions = [
        { text: `Những ngày đẹp trời cùng ${theme}.`, tag: 'Tươi sáng', author: 'Story' },
        { text: 'Từng bức ảnh là một lát cắt thời gian vô giá.', tag: 'Hoài niệm', author: 'Film 35mm' },
        { text: 'Every picture tells a quiet little story.', tag: 'Minimal', author: 'Aesthetic' },
        { text: 'Ánh sáng và nụ cười tạo nên kiệt tác.', tag: 'Nghệ thuật', author: 'Kroma' },
      ];
      return res.json({ captions: fallbackCaptions, source: 'fallback' });
    }
  });

  // AI Style & Palette Recommendation
  app.post('/api/ai/suggest-style', async (req, res) => {
    const { theme = 'Du lịch biển' } = req.body;

    if (!ai) {
      return res.json({
        palette: ['#0f172a', '#f8fafc', '#d97706', '#0284c7', '#f1f5f9'],
        recommendedFilter: 'kodak',
        grain: 25,
        vignette: 20,
        notes: 'Phong cách Film ấm áp hoài niệm, tôn nước da và ánh hoàng hôn rực rỡ.',
        suggestedBg: '#0f172a',
      });
    }

    try {
      const prompt = `Bạn là giám đốc mỹ thuật thiết kế photo collage chuyên nghiệp.
Với chủ đề ảnh: "${theme}", hãy gợi ý bảng màu nền, bộ lọc (chọn 1 trong: kodak, vintage, noir, cyber, cinematic, polaroid, pastel, warmth), độ nhiễu hạt film (0-50), độ tối góc vignette (0-40) và màu nền hex.

Trả về duy nhất JSON thuần không có markdown code blocks:
{
  "palette": ["#hex1", "#hex2", "#hex3", "#hex4", "#hex5"],
  "recommendedFilter": "kodak",
  "grain": 25,
  "vignette": 20,
  "notes": "lời khuyên mỹ thuật ngắn gọn 1-2 câu",
  "suggestedBg": "#hex"
}`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: prompt,
      });

      const rawText = response.text || '';
      const cleanJson = rawText.replace(/```json\n?|\n?```/g, '').trim();
      const parsed = JSON.parse(cleanJson);
      return res.json(parsed);
    } catch (err: any) {
      console.error('Gemini style error:', err);
      return res.json({
        palette: ['#1c1917', '#fafaf9', '#e11d48', '#f59e0b', '#78716c'],
        recommendedFilter: 'vintage',
        grain: 20,
        vignette: 15,
        notes: 'Tông màu film cổ điển ấm áp phù hợp với khoảnh khắc tự nhiên.',
        suggestedBg: '#1c1917',
      });
    }
  });

  // Setup Vite middlewares in development
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static('dist'));
  }

  const port = Number(process.env.PORT) || 3000;
  app.listen(port, '0.0.0.0', () => {
    console.log(`Kroma Studio server running on port ${port}`);
  });
}

startServer();
