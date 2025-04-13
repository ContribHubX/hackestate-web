import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { FormInput } from "../ui/form/form.input"
import {
    Form,
  } from "@/components/ui/form/form"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { LoginSchema, loginSchema, useLogin } from "@/service/auth/login"
import { useToast } from "@/hooks/use-toast"
import { Spinner } from "../ui/spinner"
import { useDispatch } from "react-redux"
import { loginUser } from "@/redux/slice/auth"
import { useNavigate } from "react-router-dom"


export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {

const {mutate, isPending} = useLogin();
const { toast } = useToast()
const dispatch = useDispatch();
const navigate = useNavigate();

const form = useForm<LoginSchema>({
  resolver: zodResolver(loginSchema),
  defaultValues: {
      email: "admin@admin.com",
      password: "Admin123#"
  }
})

const onSubmit = (value: LoginSchema) => {
  mutate(value, {
    onSuccess: (data) => {
      toast({
        description: "Login Successful",
      })
      dispatch(loginUser({ admin: data.admin, token: data.token }));
      console.log(`api response: ${data}`);
      navigate("/dashboard");
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (error: any) => {
      toast({
        title: "Login Error",
        description: error.response.data.message,
      })
      console.log(error);
    }
  })
}

 return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-2xl text-primary font-bold">Lab Manager 🏥</CardTitle>
          <CardDescription>
            Login to your Administrator account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <div className="grid gap-6">
                  <div className="grid gap-6">

                   <FormInput
                        control={form.control}
                        name="email"
                        label="Email"
                        placeholder="m@gmail.com"

                    />

                    <FormInput
                        control={form.control}
                        name="password"
                        label="Password"
                        placeholder=""
                        type="password"
                    />


                    <Button type="submit" className="w-full bg-primary" disabled={isPending}>
                      {isPending && (
                        <Spinner size="medium" className="text-card" />
                      )}
                      Login
                    </Button>
                  </div>
                </div>
              </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}
