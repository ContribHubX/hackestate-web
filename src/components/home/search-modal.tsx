import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { SearchProperty, SearchAgent, searchPropertySchema, searchAgentSchema } from "@/service/search/search"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Button } from "../ui/button";
import { ListFilter } from "lucide-react";
import { Select } from "@radix-ui/react-select";
import { Form, FormField } from "../ui/form/form";


export const SearchModal = () => {

	const [searchingFor, setSearchType] = useState(false)

	const propertyForm = useForm<SearchProperty>({
	  resolver: zodResolver(searchPropertySchema),
	  defaultValues: {
		status: "sale",
		title: "",
		location: "",
		beds: 0,
		baths: 0
	  }
	})

	const agentForm = useForm<SearchAgent>({
		resolver: zodResolver(searchAgentSchema),
		defaultValues: {
			name: ""
		}
	})

	return (
		<Dialog>
			<DialogTrigger>
				<Button>
					Specified Search
				</Button>
			</DialogTrigger>
			<DialogContent>

				<DialogHeader>
					<DialogTitle>
						Search Property
					</DialogTitle>
					<DialogDescription>
						Specify property details to find what you really want
					</DialogDescription>
				</DialogHeader>

				{/* Property Search */}
				{!searchingFor &&
					<Form {...propertyForm}>
						<FormField 
							
							render={({field}) => {
								
							}}
						/>
					</Form>
				}

				{/* Agent Search */}
				{/* {searchingFor &&
					<Form>

					</Form>
				} */}

				<DialogFooter>
					<Button variant={"destructive"}>
						Cancel
					</Button>
					<Button>
						Search
					</Button>
				</DialogFooter>
				
				
			</DialogContent>
		</Dialog>
	)
}