import { PollyClient, SynthesizeSpeechCommand, DescribeVoicesCommand } from '@aws-sdk/client-polly';

const client = new PollyClient({
  region: import.meta.env.VITE_REGION,
  credentials: {
    accessKeyId: import.meta.env.VITE_CLIENTID,
    secretAccessKey: import.meta.env.VITE_SECRETKEY,
  },
});

export const synthesizeSpeech = async (
  text: string,
  voiceId: string,
  engine = 'neural',
  outputFormat = 'mp3'
) => {
  try {
    const command = new SynthesizeSpeechCommand({
      Text: text,
      VoiceId: voiceId,
      OutputFormat: outputFormat,
      Engine: engine,
    });

    const response = await client.send(command);
    
    if (response.AudioStream) {
      const audioData = await response.AudioStream.transformToByteArray();
      const blob = new Blob([audioData], { type: `audio/${outputFormat}` });
      return URL.createObjectURL(blob);
    }
    throw new Error('No audio stream received');
  } catch (error) {
    console.error('Error synthesizing speech:', error);
    throw error;
  }
};

export const getAvailableVoices = async () => {
  try {
    const command = new DescribeVoicesCommand({});
    const response = await client.send(command);
    return response.Voices || [];
  } catch (error) {
    console.error('Error fetching voices:', error);
    return [];
  }
};