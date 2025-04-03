// import { GithubAuthService, GoogleAuthService, ISocialAuthService } from "@/common/utils/oauth-service";
// import { User } from "@/database/schema";
// import Container, { Inject, Service } from "typedi";

// export type SocialAuthProvider = "GOOGLE" | "GITHUB"

// @Service()
// export class AuthServiceExternal{
//     @Inject(() => AuthFactory)
//     private readonly providerFactory! : AuthFactory;


//     /**


//     // generateAuthUrl(provider: SocialAuthProvider): string {
//     //     const authProvider = this.providerFactory.getProvider(provider);
//     //     return authProvider.generateAuthorizationURL();
//     // }


//     // /**
//     //  *
//     //  */
//     // async handleOAuthCallback(provider: SocialAuthProvider, code: string) : Promise<User>{
//     //     const authProvider = this.providerFactory.getProvider(provider);
//     //     return await authProvider.handleCallback(code);
//     // }
// }


// @Service()
// class AuthFactory {

//     getProvider(provider: SocialAuthProvider) {
//         switch (provider) {
//             case "GOOGLE":
//                 return Container.get(GoogleAuthService);
//             case "GITHUB":
//                 return Container.get(GithubAuthService);
//             default:
//                 throw Error("Invalid provider");
//         }

//     }
// }
