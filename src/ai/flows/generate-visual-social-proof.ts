'use server';

/**
 * @fileOverview Generates realistic-looking social media comments and profile pictures to add credibility to the offers.
 *
 * - generateVisualSocialProof - A function that handles the generation of visual social proof.
 * - GenerateVisualSocialProofInput - The input type for the generateVisualSocialProof function.
 * - GenerateVisualSocialProofOutput - The return type for the generateVisualSocialProof function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateVisualSocialProofInputSchema = z.object({
  comment: z.string().describe('The text content of the social media comment.'),
  userName: z.string().describe('The name of the user posting the comment.'),
});
export type GenerateVisualSocialProofInput = z.infer<typeof GenerateVisualSocialProofInputSchema>;

const GenerateVisualSocialProofOutputSchema = z.object({
  commentText: z.string().describe('The generated text of the comment.'),
  profilePicture: z.string().describe('The generated profile picture as a data URI.'),
});
export type GenerateVisualSocialProofOutput = z.infer<typeof GenerateVisualSocialProofOutputSchema>;

export async function generateVisualSocialProof(input: GenerateVisualSocialProofInput): Promise<GenerateVisualSocialProofOutput> {
  return generateVisualSocialProofFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateVisualSocialProofPrompt',
  input: {schema: GenerateVisualSocialProofInputSchema},
  output: {schema: GenerateVisualSocialProofOutputSchema},
  prompt: `You are an expert in generating realistic social media content.

  Given a username "{{userName}}" and comment "{{comment}}", generate a profile picture appropriate for the user and re-write the comment so that it appears more realistic.
  The profile picture must be returned as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'.

  Output the profile picture and revised comment text in JSON format.

  Here's an example of the valid output:
  {
    "commentText": "Wow, this offer is amazing! Just got my free 100GB, thanks!",
    "profilePicture": "data:image/png;base64,<base64_encoded_image_data>"
  }`,
});

const generateVisualSocialProofFlow = ai.defineFlow(
  {
    name: 'generateVisualSocialProofFlow',
    inputSchema: GenerateVisualSocialProofInputSchema,
    outputSchema: GenerateVisualSocialProofOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
