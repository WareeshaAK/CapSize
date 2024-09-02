import { NextResponse } from 'next/server';
import Groq from 'groq-sdk';

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export async function POST(request) {
    try {
        const { query, tone, platform } = await request.json();

        console.log('Request Data:', { query, tone, platform });

        const completion = await groq.chat.completions.create({
            model: 'llama-3.1-70b-versatile', 
            messages: [
                { role: 'system', content: `You are a helpful assistant.` },
                { role: 'user', content: `Generate a social media caption for ${platform} using a ${tone} tone: ${query}` }
            ],
            max_tokens: 500,
            temperature: 0.7,
            stop: ['\n']
        });

        console.log('API Response:', completion);

        if (completion && completion.choices && completion.choices.length > 0) {
            const generated_caption = completion.choices[0].message.content.trim();
            return NextResponse.json({ data: { generated_caption } }, { status: 200 });
        } else {
            throw new Error('No choices found in response');
        }
    } catch (error) {
        console.error('API Error:', error.message);
        return NextResponse.json({ error: `Failed to generate caption: ${error.message}` }, { status: 500 });
    }
}
