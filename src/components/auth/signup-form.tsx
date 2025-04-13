import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import {
    Form,
  } from "@/components/ui/form/form"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { NavLink } from "react-router-dom"
import { cn } from "@/lib/utils"


import { FormInput } from "../ui/form/form.input"
import { registerSchema, RegisterSchema, useRegister } from "@/service/auth/register"
import { useToast } from "@/hooks/use-toast"
import { Spinner } from "../ui/spinner"


export function SignupForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {

const { mutate, isPending } = useRegister();
const {toast} = useToast();

const form = useForm<RegisterSchema>({
  resolver: zodResolver(registerSchema),
  defaultValues: {
      email: "",
      name: "",
      password: ""
  }
})

const onSubmit = (value: RegisterSchema) => {
  mutate(value, {
    onSuccess: () => {
      toast({
        description: "Register Successful",
      })
    },
    onError: (error: unknown) => {
      // alert(error.response.data.message);
      console.log(error)
    }
  })
}

 return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Let's Get you Started!</CardTitle>
          <CardDescription>
            Enter your personal Information
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <div className="grid gap-6">
                  <div className="flex flex-col gap-4">
                    
                    <FormInput 
                        control={form.control}
                        name="email"
                        label="Email"
                        placeholder="m@gmail.com"
                        
                    />

                    <FormInput 
                        control={form.control}
                        name="name"
                        label="Name"
                        placeholder="JohnDoe"
                        
                    />          

                    <FormInput 
                        control={form.control}
                        name="password"
                        label="Password"
                        placeholder=""
                        type="password"
                    />

                    <Button type="submit" className="w-full" disabled={isPending}>
                      {isPending && (
                        <Spinner size="medium" className="text-card" />
                      )}  
                      Sign up
                    </Button>
                    </div>
                  <div className="text-center text-sm">
                    Don&apos;t have an account?{" "}
                    <NavLink className="underline underline-offset-4" to="/auth/login">Login</NavLink>
                  </div>
                </div>
              </form>
          </Form>
        </CardContent>
      </Card>
      <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 [&_a]:hover:text-primary  ">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </div>
    </div>
  )
}
