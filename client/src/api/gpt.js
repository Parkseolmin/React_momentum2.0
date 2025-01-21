import axios from 'axios';

export const CallGPT = async ({ prompt }) => {
  try {
    // GPT 모델과 상호작용할 메시지 설정
    const messages = [
      {
        role: 'system',
        content: `You are the user's close friend and are the role of writing and analyzing emotional diaries in the most friendly tone and informal way. The next step is to proceed.`,
      },
      {
        role: 'user',
        content: `
            Please translate it into Korean
            
            1. Understand the [events] separated by "" at the bottom and write a diary title.
            2. Summarize [events] in order.
            3. [events] Write an emotional diary in five paragraphs based on the contents.
            4. The written emotional diary assesses what kind of mental state there is.
            5. Psychological analysis is conducted using professional psychological knowledge.
            6. Check [the incident] and use psychological analysis to understand how you spent your day and write five paragraphs of consolation, celebration, and encouragement in the tone delivered by a close friend.
            7. Please write down 3 action tips that will help users in situations in the future.
            
            ###important!: Translate into Korean and Use the output in the following JSON format:

            {
               title: here is [title],
               summary: here is [summarize],
               emotional_content: here is [emotional_diary],
               emotional_result: here is [evaluates],
               analysis: here is [Psychological analysis],
               appraisal: here is [encouragement],
               action_list: here is ["", "", ""],
            }

            [event]:`,
      },
      {
        role: 'user',
        content: `
            """
            ${prompt}
            """
            `,
      },
    ];

    // GPT API에 메시지 전송
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-3.5-turbo',
        messages,
        temperature: 0.4,
        max_tokens: 1_000,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`,
        },
      }
    );

    // API 응답에서 생성된 메시지 추출
    const message = response.data.choices[0].message.content;
    return message;
  } catch (error) {
    console.error('API 오류 :', error);
    throw new Error(error);
  }
};
