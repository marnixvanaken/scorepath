import { TwitterApi } from 'twitter-api-v2';

export type XAccount = 'laasteman' | 'scorepath';

function getClient(account: XAccount): TwitterApi {
  const appKey = process.env.ConsumerKey;
  const appSecret = process.env.SecretKey;

  let accessToken: string | undefined;
  let accessSecret: string | undefined;

  if (account === 'laasteman') {
    accessToken = process.env.AccessToken;
    accessSecret = process.env.AccessTokenSecret;
  } else {
    accessToken = process.env.AccessToken_Scorepath;
    accessSecret = process.env.AccessTokenSecret_Scorepath;
  }

  if (!appKey || !appSecret || !accessToken || !accessSecret) {
    throw new Error(`Missing Twitter credentials for account: ${account}`);
  }

  return new TwitterApi({ appKey, appSecret, accessToken, accessSecret });
}

export async function postTweet(text: string, account: XAccount = 'laasteman'): Promise<string> {
  const client = getClient(account);
  const { data } = await client.v2.tweet(text);
  return data.id;
}
