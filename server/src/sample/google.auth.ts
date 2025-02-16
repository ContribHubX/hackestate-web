
// export interface ISocialAuthService {
//     generateAuthorizationURL(): string;
//     handleCallback(code: string, state: string): Promise<User>;
//     getUserFromSocialProvider(accessToken: string): Promise<{ ok: boolean, userData: any }>
//     getMyDetails(accessToken: string): Promise<User>;
//   }

// @Service()
// class GoogleAuthService implements ISocialAuthService {
//   @Inject(() => UserService)
//   private readonly userService!: UserService;

//   private readonly google: Google;
//   private codeVerifier: string;
//   private static readonly state: string = "RANDOM123";
//   private static readonly FETCH_USER_URL = "https://openidconnect.googleapis.com/v1/userinfo";

//   constructor() {
//     this.codeVerifier = this.generateCodeVerifier();
//     this.google = new Google(
//       process.env.AUTH_GOOGLE_CLIENT_ID!,
//       process.env.AUTH_GOOGLE_CLIENT_SECRET!,
//       process.env.AUTH_GOOGLE_REDIRECT!,
//     );
//   }

//   public generateAuthorizationURL(): string {
//     // const codeChallenge = this.generateCodeChallenge(this.codeVerifier);

//     const url = this.google.createAuthorizationURL(
//       GoogleAuthService.state,
//       this.codeVerifier,
//       ["openid", "profile", "email"],
//     );

//     return url.href;
//   }

//   public async handleCallback(code: string, state: string): Promise<User> {
//     if (!code) {
//         throw AppError.unauthorized("Authorization code is required");
//     }

//     const tokens = await this.google.validateAuthorizationCode(
//         code,
//         this.codeVerifier,
//     );

//     console.log(tokens);

//     const user = await this.getMyDetails(tokens.accessToken());
  
//     return user;
//   }

//   public async getMyDetails(accessToken: string): Promise<User> {
//     const { userData } = await this.getUserFromSocialProvider(accessToken);

//     const user = {
//         // id: userData.sub,
//         displayName: userData.name,
//         email: userData.email,
//         avatar: userData.picture
//     };

//     return await this.userService.saveOrUpdate(user);
//   }

//   public async getUserFromSocialProvider(accessToken: string): Promise<{ ok: boolean, userData: any }> {
//     try {
//       const response = await fetch(GoogleAuthService.FETCH_USER_URL, {
//           headers: {
//             Authorization: `Bearer ${accessToken}`,
//         },
//       });
//       const userData: any = await response.json();
//       return { ok: true, userData }
//     } catch (error) {
//       return { ok: false, userData: undefined }
//     }
//   }

//   private generateCodeVerifier(): string {
//     return crypto.randomBytes(64).toString("base64url");
//   }
// }
