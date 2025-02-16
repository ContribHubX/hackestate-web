import { User, UserInsert } from "@/database/schema/user";
import { GitHub, Google } from "arctic";
import { Inject, Service } from "typedi";
import { AppError } from "../app-error";
import crypto from "crypto";;
import AuthService from "@/features/auth/auth.service";
import { env } from "./env-config";
import { response } from "express";



export interface ISocialAuthService {
    generateAuthorizationURL(): string;
    handleCallback(code: string): Promise<User>;
    getUserFromSocialProvider(accessToken: string): Promise<{ ok: boolean, userData: any }>
    getMyDetails(accessToken: string): Promise<User>;
  }

@Service()
export class GoogleAuthService implements ISocialAuthService {

    @Inject(()=> AuthService)
    private readonly authService! : AuthService;
    
    private readonly google: Google;
    private codeVerifier: string;
    private static readonly state: string = "RANDOM123";
    private static readonly FETCH_USER_URL = "https://openidconnect.googleapis.com/v1/userinfo";

    constructor() {
        this.codeVerifier = this.generateCodeVerifier();
        this.google = new Google(
            env.googleClientId,
            env.googleClientSecret,
            env.googleRedirectUrl
        );
    }

    public generateAuthorizationURL(): string {
        // const codeChallenge = this.generateCodeChallenge(this.codeVerifier);

        const url = this.google.createAuthorizationURL(
            GoogleAuthService.state,
            this.codeVerifier,
            ["openid", "profile", "email"],
        );

        return url.href;
    }

    public async handleCallback(code: string): Promise<User> {
        if (!code) {
            throw AppError.unauthorized("Authorization code is required");
        }

        const tokens = await this.google.validateAuthorizationCode(
            code,
            this.codeVerifier,
        );

        const user = await this.getMyDetails(tokens.accessToken());
        return user;
    }

    public async getMyDetails(accessToken: string): Promise<User> {
        const { userData } = await this.getUserFromSocialProvider(accessToken);

        const user : UserInsert = {
            name: userData.name,
            email: userData.email,
            picture: userData.picture,
            password: ""
        };

        return await this.authService.SaveOrUpdateUser(user);
    }

    public async getUserFromSocialProvider(accessToken: string): Promise<{ ok: boolean, userData: any }> {
        try {
            const response = await fetch(GoogleAuthService.FETCH_USER_URL, {
                headers: {
                Authorization: `Bearer ${accessToken}`,
            },
            });
            const userData: any = await response.json();
            return { ok: true, userData }
        } catch (error) {
            return { ok: false, userData: undefined }
        }
    }

    private generateCodeVerifier(): string {
        return crypto.randomBytes(64).toString("base64url");
    }
}


@Service()
export class GithubAuthService implements ISocialAuthService {
    @Inject(()=> AuthService)
    private readonly authService! : AuthService;

    private readonly github: GitHub;
    private static readonly state: string = "ETHANGWAPO";

    private static readonly FETCH_USER_URL = "https://api.github.com/user";
    private static readonly FETCH_USER_EMAILS = "https://api.github.com/user/emails";
    
    constructor() {
        this.github = new GitHub(
            env.githubClientId,
            env.githubClientSecret,
            env.githubRedirectUrl
        )
    }

    generateAuthorizationURL(): string {
        const url = this.github.createAuthorizationURL(
            GithubAuthService.state,
            ["user", "user:email"]
        )
        return url.href;
    }
    
    public async handleCallback(code: string): Promise<User> {
        if(!code){
            throw AppError.unauthorized("Authorization code is required");
        }

        const tokens = await this.github.validateAuthorizationCode(code)

        const user = await this.getMyDetails(tokens.accessToken());
        return user;
    }

    
    public async getMyDetails(accessToken: string): Promise<User> {
        const { userData } = await this.getUserFromSocialProvider(accessToken);
        const email = await this.getUserEmail(accessToken);

        // https://docs.github.com/en/rest/users/users?apiVersion=2022-11-28#get-the-authenticated-user
        const user : UserInsert = {
            name: userData.name,
            email,
            picture: userData.avatar_url,
            password: ""
        }
        
        return await this.authService.SaveOrUpdateUser(user);
    }
    
    public async getUserFromSocialProvider(accessToken: string): Promise<{ ok: boolean; userData: any; }> {
        try {
            const userResponse = await fetch(GithubAuthService.FETCH_USER_URL, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            })
            const userData: any = await userResponse.json();
            return { ok: true, userData }
        } catch (error) {
            return { ok: false, userData: undefined }
        }
    
    }

    private async getUserEmail(accessToken: string): Promise<string> {
        try {
            const userResponse = await fetch(GithubAuthService.FETCH_USER_EMAILS, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            })
            const userData: any = await userResponse.json();
            return userData[0].email;
        } catch (error) {
            throw error;
        }
    
    }

}

// [
//     {
//         "email": "Lorenzolubguban@gmail.com",
//         "primary": true,
//         "verified": true,
//         "visibility": "private"
//     },
//     {
//         "email": "113151776+y4nder@users.noreply.github.com",
//         "primary": false,
//         "verified": true,
//         "visibility": null
//     }
// ]