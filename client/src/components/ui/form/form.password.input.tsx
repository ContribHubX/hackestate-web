/* eslint-disable @typescript-eslint/no-explicit-any */

import { FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form/form"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Control } from "react-hook-form"

type InputType = "text" | "email" | "password" | "number" | "tel" | "url";

interface FormInputProps {
  control: Control<any>
  name: string
  label: string
  type?: InputType
  placeholder?: string
  required?: boolean
}

export function FormInput({ control, name, label, type = "text", placeholder, required = true }: FormInputProps) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <div className="grid gap-2">
            <Label htmlFor={name}>{label}</Label>
            <FormControl>
              <Input 
                id={name} 
                type={type} 
                placeholder={placeholder} 
                required={required} 
                {...field} 
            />
            </FormControl>
            <FormMessage />
          </div>
        </FormItem>
      )}
    />
  )
}
