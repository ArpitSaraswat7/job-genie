"use server";

const context = `
Option 1: Direct and Benefit-Oriented

"Unlock your career potential with our comprehensive app, featuring personalized career coaching and essential job search tools. Gain a competitive edge with up-to-date industry insights, empowering you to make informed career decisions. Craft a standout resume with our intuitive builder, create compelling cover letters that capture attention, and master your interview skills with our expert preparation resources. Let us guide you towards your dream career."

Option 2: Focus on Empowerment and Confidence

"Take control of your career journey with our app, designed to empower you with the knowledge and tools you need to succeed. Benefit from personalized career coaching, and stay ahead of the curve with our in-depth industry insights. Build a professional resume that highlights your strengths, craft persuasive cover letters that open doors, and approach every interview with confidence. Your career success starts here."

Option 3: Highlight the Practical Tools

"Our app provides everything you need to navigate the job market effectively. Leverage our resume builder to create ATS-friendly resumes, use our cover letter creator to write compelling applications, and prepare for interviews with our expert tips and practice questions. Plus, benefit from personalized career coaching and valuable industry insights, ensuring you're always one step ahead in your career advancement."

Option 4: Emphasize Personalized Guidance

"Receive tailored career guidance and support with our app's personalized coaching feature. Stay informed with our regularly updated industry insights, and utilize our three essential tools: a resume builder for crafting impactful resumes, a cover letter creator for writing persuasive applications, and interview prep resources to boost your confidence. Let us be your partner in achieving your career goals."

Option 5: Short and Punchy for Marketing Materials

"Career coaching, industry insights, and powerful tools—all in one app. Build your resume, craft cover letters, and ace your interviews. Your career success starts here."

Key Elements Covered:

Career Coaching: Emphasizing personalized guidance.
Industry Insights: Highlighting the value of staying informed.
Resume Builder: Focusing on creating professional, ATS-friendly resumes.
Cover Letter Creator: Stressing the importance of compelling applications.
Interview Prep: Emphasizing confidence and success in interviews.
`;

import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export default async function chatbotOutput(input) {
  try {
    const prompt = `Answer briefly: ${input}\nContext: ${context}`;
    const result = await model.generateContent(prompt);
    const content = result.response.text().trim();
    console.log("content", content);
    return content;
  } catch (error) {
    console.log(error);
    return "An error occurred while generating the response.";
  }
}
