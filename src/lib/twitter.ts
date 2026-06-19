import { TwitterApi } from 'twitter-api-v2';

function getClient(): TwitterApi {
  const appKey = process.env.TWITTER_API_KEY;
  const appSecret = process.env.TWITTER_API_SECRET;
  const accessToken = process.env.TWITTER_ACCESS_TOKEN;
  const accessSecret = process.env.TWITTER_ACCESS_TOKEN_SECRET;

  if (!appKey || !appSecret || !accessToken || !accessSecret) {
    throw new Error('Missing Twitter API credentials in environment variables');
  }

  return new TwitterApi({ appKey, appSecret, accessToken, accessSecret });
}

export async function postTweet(text: string): Promise<string> {
  const client = getClient();
  const { data } = await client.v2.tweet(text);
  return data.id;
}
