import NextAuth, { NextAuthOptions } from "next-auth"
import type { JWT } from "next-auth/jwt";
import { Issuer } from 'openid-client';
import { custom } from 'openid-client';
import { AppSettings } from "../../../functions/AppSettings"
import { UserInfo } from "../../../functions/AuthorizationContext";
import CredentialsProvider from "next-auth/providers/credentials";

/**
 * Takes a token, and returns a new token with updated
 * `accessToken` and `accessTokenExpires`. If an error occurs,
 * returns the old token and an error property
 */
async function refreshAccessToken(token: JWT & { refreshToken?: string }) {
    try {
        if (!token.refreshToken) {
            throw new Error('Refresh token is empty!');
        }

        const discovery = await Issuer.discover(AppSettings.current.oidcIssuer);

        const client = new discovery.Client({
            client_id: AppSettings.current.oidcClientId,
            token_endpoint_auth_method: 'none',
        });

        client[custom.clock_tolerance] = 10; // to allow a 10 second skew

        // console.log('NextAuth refreshing token: ', token.refreshToken);
        const update = await client.refresh(token.refreshToken);

        return {
            ...token,
            accessToken: update.access_token,
            accessTokenExpires: calculateExpireAtMilliseconds(update.expires_at),
            refreshToken: update.refresh_token ?? token.refreshToken, // Fall back to old refresh token
        }
    } catch (err) {
        console.log('NextAuth error when refreshing token: ', err);

        return {
            ...token,
            error: "RefreshAccessTokenError",
        }
    }
}

function calculateExpireAtMilliseconds(expireAtSeconds: number | undefined) {
    // we didn't get expireAt value, just assume it will expire in 15 minutes
    if (!expireAtSeconds) {
        return Date.now() + 15 * 60 * 1000;
    }

    return expireAtSeconds * 1000;
}

function hasNotExpired(expireAtSeconds: unknown): boolean {
    if (typeof expireAtSeconds !== 'number') {
        return false;
    }

    if (!expireAtSeconds) {
        return false;
    }

    return (Date.now() < expireAtSeconds);
}

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
          name: 'Credentials',
          credentials: {
            username: { label: "Username", type: "text", placeholder: "admin@accelist.com" },
            password: { label: "Password", type: "password", placeholder: "admin" }
          },
          async authorize(credentials) {

            try {
                const res = await fetch("http://localhost:3000/api/be/api/v1/Auth/Login", {
                    method: 'POST',
                    body: JSON.stringify(credentials),
                    headers: { "Content-Type": "application/json" }
                });

                const user = await res.json();

                // If no error and we have user data, return it
                if (res.ok && user) {
                    return user;
                }

                // Return null if user data could not be retrieved
                return null;
            } catch (error) {
                console.error('Authorization error:', error);
                throw new Error('Authorization failed');
            }
          }
        })
      ],
    callbacks: {
        async jwt({ token, account, user }) {
            // Initial sign in
            if (account && user) {
                // console.log(JSON.stringify(account, null, 4));
                return {
                    accessToken: account.access_token,
                    accessTokenExpires: calculateExpireAtMilliseconds(account.expires_at),
                    refreshToken: account.refresh_token,
                    user,
                }
            }

            // Return previous token if the access token has not expired yet
            // console.log(Date.now(), accessTokenExpires);
            if (hasNotExpired(token['accessTokenExpires'])) {
                // console.log('Token not expired yet');
                return token;
            }

            // console.log('Token has expired');
            // Access token has expired, try to update it
            return refreshAccessToken(token)
        },
        async session({ session, token }) {
            // Send properties to the client, like an access_token from a provider.
            session.user = token['user'] as UserInfo;
            session['accessToken'] = token['accessToken'];
            session['error'] = token['error'];
            return session
        }
    },
}

export default NextAuth(authOptions)


