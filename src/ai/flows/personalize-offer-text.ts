'use server';

/**
 * @fileOverview A flow that personalizes internet offer descriptions to match user interests.
 *
 * - personalizeOfferText - A function that personalizes the offer text.
 * - PersonalizeOfferTextInput - The input type for the personalizeOfferText function.
 * - PersonalizeOfferTextOutput - The return type for the personalizeOfferText function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PersonalizeOfferTextInputSchema = z.object({
  offerDescription: z.string().describe('The original description of the internet offer.'),
  userInterests: z.string().describe('A brief description of the user interests.'),
});

export type PersonalizeOfferTextInput = z.infer<typeof PersonalizeOfferTextInputSchema>;

const PersonalizeOfferTextOutputSchema = z.object({
  personalizedOfferText: z
    .string()
    .describe('The personalized description of the internet offer.'),
});

export type PersonalizeOfferTextOutput = z.infer<typeof PersonalizeOfferTextOutputSchema>;

export async function personalizeOfferText(
  input: PersonalizeOfferTextInput
): Promise<PersonalizeOfferTextOutput> {
  return personalizeOfferTextFlow(input);
}

const prompt = ai.definePrompt({
  name: 'personalizeOfferTextPrompt',
  input: {schema: PersonalizeOfferTextInputSchema},
  output: {schema: PersonalizeOfferTextOutputSchema},
  prompt: `You are an expert marketing copywriter. Please rewrite the following internet offer description to be more appealing to a user with the following interests. Maintain accuracy in your description.

Offer Description: {{{offerDescription}}}
User Interests: {{{userInterests}}}

Personalized Offer Description:`,
});

const personalizeOfferTextFlow = ai.defineFlow(
  {
    name: 'personalizeOfferTextFlow',
    inputSchema: PersonalizeOfferTextInputSchema,
    outputSchema: PersonalizeOfferTextOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
