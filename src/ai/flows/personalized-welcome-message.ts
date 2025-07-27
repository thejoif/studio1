// A personalized welcome message AI agent.
//
// - generatePersonalizedWelcomeMessage - A function that generates a personalized welcome message.
// - PersonalizedWelcomeMessageInput - The input type for the generatePersonalizedWelcomeMessage function.
// - PersonalizedWelcomeMessageOutput - The return type for the generatePersonalizedWelcomeMessage function.

'use server';

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PersonalizedWelcomeMessageInputSchema = z.object({
  userName: z.string().describe('The name of the user to generate the welcome message for.'),
  userRole: z.string().describe('The role of the user (e.g., owner, administrator, moderator).'),
});
export type PersonalizedWelcomeMessageInput = z.infer<typeof PersonalizedWelcomeMessageInputSchema>;

const PersonalizedWelcomeMessageOutputSchema = z.object({
  welcomeMessage: z.string().describe('The personalized welcome message for the user.'),
});
export type PersonalizedWelcomeMessageOutput = z.infer<typeof PersonalizedWelcomeMessageOutputSchema>;

export async function generatePersonalizedWelcomeMessage(
  input: PersonalizedWelcomeMessageInput
): Promise<PersonalizedWelcomeMessageOutput> {
  return personalizedWelcomeMessageFlow(input);
}

const prompt = ai.definePrompt({
  name: 'personalizedWelcomeMessagePrompt',
  input: {schema: PersonalizedWelcomeMessageInputSchema},
  output: {schema: PersonalizedWelcomeMessageOutputSchema},
  prompt: `You are an AI assistant tasked with generating personalized welcome messages for users of the ServiceFlow application.

  The user's name is: {{{userName}}}
  The user's role is: {{{userRole}}}

  Generate a welcome message that is friendly, engaging, and appropriate for their role. The message should be no more than 2 sentences long.
  The message should also highlight the value that ServiceFlow provides.
  The output MUST be in the following JSON format:
  {
    "welcomeMessage": "The personalized welcome message here"
  }`,
});

const personalizedWelcomeMessageFlow = ai.defineFlow(
  {
    name: 'personalizedWelcomeMessageFlow',
    inputSchema: PersonalizedWelcomeMessageInputSchema,
    outputSchema: PersonalizedWelcomeMessageOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
