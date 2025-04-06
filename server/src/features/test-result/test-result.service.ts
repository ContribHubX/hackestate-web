import { NodePgDatabase } from "drizzle-orm/node-postgres";
import { TestResult, TestResultInsert, User } from "@/database/schema";
import * as schema from "@/database/schema";
import { Container, Inject, Service } from "typedi";
import { eq } from "drizzle-orm";
import { AppError } from "@/common/app-error";
import { HttpContextService } from "@/common/http-context";
import AuthService from "../auth/auth.service";
import { TestResultDto, TestResultDtoMinimal } from "./test-result.contract";


@Service()
export default class TestResultService {

    @Inject(() => HttpContextService)
    private readonly httpContext!: HttpContextService;


    @Inject(() => AuthService)
    private readonly authService!: AuthService;

    private readonly db!: NodePgDatabase<typeof schema>

    constructor() {
        this.db = Container.get("database");
    }

    // upload test result
    async UploadTestResult(file : Express.Multer.File) : Promise<TestResult>{
        const fileName = file.originalname.replace(".pdf", "");

        const parts: string[] = fileName.split("_");

        if (parts.length < 3) {
            throw new Error("Invalid file format. Expected format: PID_nameOfTest_testDate.pdf");
        }

        const pid = parts[0]; // "12345"
        const testDateStr = parts[parts.length - 1]; // "2024-03-30"
        const testName = parts.slice(1, -1).join(" "); // "BloodTest" or multi-word test names

        // check first if PID exist in db
        const existingUser = await this.db.query.user.findFirst({
            where : eq(schema.user.pid, pid)
        });

        // if user does not exist
        let createdUser = null;
        if(!existingUser){
            console.log("no existing user, will create a user");
            createdUser = await this.authService.CreateUser({
                pid
            })
        } else {
            console.log("there is existing user will not create");
        }

        // Convert testDateStr to a Date object
        const testDate = new Date(testDateStr);
        if (isNaN(testDate.getTime())) {
            throw new Error("Invalid test date format. Expected YYYY-MM-DD.");
        }


        const testResult: TestResultInsert = {
            userPid: createdUser ? createdUser.pid : existingUser?.pid!,
            testName,
            testDate,
            binaryPdf: file.buffer
        };

        const [createdTestResult] = await this.db.insert(schema.testResult).values(testResult).returning();

        return createdTestResult as unknown as TestResult;
    }

    // Get test results for user via user context
    async GetTestResults() : Promise<TestResultDtoMinimal[]> {
        // const currentUser = this.httpContext.getRequest().currentUser;

        // const testResults = await this.db.query.testResult.findMany({
        //     where : (results, {eq}) => eq(results.userPid, currentUser?.pid!),
        // });

        const currentUser = "12345";

        const testResults = await this.db.query.testResult.findMany({
            where : (results, {eq}) => eq(results.userPid, currentUser!),
        });


        return testResults.map(({ binaryPdf, ...rest }) => rest);
    }

    async GetTestResult(id: string) : Promise<TestResultDto>{

        const testResult = await this.db.query.testResult.findFirst({
            where: eq(schema.testResult.id, id)
        });

        if(!testResult){
            throw AppError.badRequest("Test result does not exist");
        }

        const base64pdf = testResult?.binaryPdf.toString('base64');

        return {
            id,
            base64pdf : base64pdf!
        };
    }
}
