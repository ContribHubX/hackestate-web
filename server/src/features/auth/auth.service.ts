import { NodePgDatabase } from "drizzle-orm/node-postgres";
import Container, { Inject, Service } from "typedi";
import * as schema from "@/database/schema";
import { User, UserInsert } from "@/database/schema";
import { LoginSchema, LoginResponse, RegisterSchema, ForgotPasswordSchema, ChangePasswordSchema } from "./auth.contracts";
import { eq } from "drizzle-orm";
import { AppError } from "@/common/app-error";
import bcrypt from "bcrypt";
import { providePasswordResetToken, provideToken, verifyPasswordResetToken } from "@/common/utils/jwt-util";
import { HttpContextService } from "@/common/http-context";
import EmailService from "@/common/utils/email-service";

@Service()
class AuthService {
    @Inject(() => HttpContextService)
    private readonly httpContext!: HttpContextService;
    
    @Inject(() => EmailService)
    private readonly emailService!: EmailService;
    
    private readonly db!: NodePgDatabase<typeof schema>

    constructor() {
        this.db = Container.get("database");
    }

    async GetUsers() : Promise<User[]>{
        const users = await this.db.query.user.findMany({});
        return users;
    }

    async CreateUser(registerRequest: RegisterSchema) : Promise<User> {
        const [createdUser] = await this.db.insert(schema.user).values({...registerRequest}).returning();
        return createdUser;
    }

    async UpdateUser(user: UserInsert) : Promise<User>{        
        const [updatedUser]  = await this.db.update(schema.user)
            .set({...user})
            .where(eq(schema.user.email, user.email))
            .returning();

        return updatedUser;
    }
    
    async SaveOrUpdateUserById(user: UserInsert) : Promise<User>{
        const existingUser = await this.db.query.user.findFirst({
            where: eq(schema.user.id, user.id!)
        });
        
        return (existingUser ? await this.UpdateUser(user): await this.CreateUser({
            ...user
        }));
    }

    async SaveOrUpdateUser(user: UserInsert) : Promise<User>{
        const existingUser = await this.db.query.user.findFirst({
            where: eq(schema.user.email, user.email)
        });
        
        return (existingUser ? await this.UpdateUser(user): await this.CreateUser({
            ...user
        }));
    }

    async Register(registerRequest: RegisterSchema) {
        const existingUser = await this.db.query.user.findFirst({
            where: eq(schema.user.email, registerRequest.email)
        });

        if (existingUser){
            throw AppError.badRequest("User already exist");
        }

        const hashedPassword = await bcrypt.hash(registerRequest.password, 10);

        await this.CreateUser({
            ...registerRequest,
            password: hashedPassword
        });
    
    }

    async Login(loginRequest: LoginSchema) : Promise<LoginResponse> {
        const existingUser = await this.db.query.user.findFirst({
            where: eq(schema.user.email, loginRequest.email)
        });


        if(!existingUser){
            throw AppError.notFound("User doesn't exist");
        }

        const isMatch = await bcrypt.compare(loginRequest.password, existingUser.password);

        if(!isMatch){
            throw AppError.forbidden("Invalid Credentials");
        }
        
        const token = provideToken(existingUser);

        return {
            user: existingUser,
            token
        }
    }

    async ForgotPassword(forgotPasswordRequest: ForgotPasswordSchema){
        try{
            const userId = this.httpContext.getRequest().currentUser?.id;
            const passwordResetToken = providePasswordResetToken(userId!);
            // await sendEmail(forgotPasswordRequest.email, "Test Email", "Hello from hackathon! " + passwordResetToken);
            await this.emailService.SendPasswordResetEmail(forgotPasswordRequest.email, passwordResetToken);
        } catch(error){
            throw error;
        }
        
    }

    async ChangePassword(changePasswordRequest: ChangePasswordSchema){
        const userId = verifyPasswordResetToken(changePasswordRequest.passwordResetToken);

        if(!userId){
            throw AppError.forbidden("Invalid or expired reset token");
        }

        const hashedPassword = await bcrypt.hash(changePasswordRequest.newPassword, 10);
        
        const updatedUser = await this.db.update(schema.user)
            .set({password: hashedPassword})
            .where(eq(schema.user.id, userId))
            .returning({
                id: schema.user.id
            });
        
        if(!updatedUser.length){
            throw AppError.notFound("User not found or password update failed");
        }

        return { message: "Password changed successfully" };
    }

    async GetUser() : Promise<User | undefined>{
        return this.httpContext.getRequest().currentUser;
    }
}

export default AuthService;