// import { ModeToggle } from "@/components/ui/mode-toggle"

import RegistrationForm from "@/components/auth/signup-form"


const Signup = () => {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-background p-6 md:p-10">
        {/* <ModeToggle /> */}
        <div className="flex w-full max-w-sm flex-col gap-6">
            <RegistrationForm />
        </div>
    </div>
  )
}

export default Signup