import { zodResolver } from "@hookform/resolvers/zod"
import {Link, useNavigate} from "react-router-dom"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useForm } from "react-hook-form"
import { Signinvalidation } from "@/lib/validation"
import { z } from "zod"
import Loader from "@/components/shared/Loader"
import { useToast } from "@/components/ui/use-toast"
import { useSignInAccount } from "@/lib/react-query/queriesAndMutations"
import { useUserContext } from "@/context/AuthContext"




const SigninForm = () => {
  const {toast} = useToast()
  const navigate = useNavigate();
  const {checkAuthUser, isLoading: isUserLoading} = useUserContext();

  const{ mutateAsync: signInAccount, isPending} = useSignInAccount();


   const form = useForm<z.infer<typeof Signinvalidation>>({
    resolver: zodResolver(Signinvalidation),
    defaultValues: {
      email: "",
      password: "",
    },
  })
 
  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof Signinvalidation>) {

    const session = await signInAccount({
      email: values.email,
      password: values.password,
    });
    
    console.log('Session:', session);
    if(!session){
      return toast({title: 'Sign in failed. Please try again.'})
    }

    const isLoggedIn = await checkAuthUser();
    console.log("isLoggedIn:", isLoggedIn);

    if(isLoggedIn){
      form.reset();
      console.log("Navigation to '/'");
      navigate('/')
    } else{
      return toast({title:'Sign in failed. Please try again.'})
    }

  }

  return (
    <Form {...form}>
      
      <div className="sm:w-420 flex-center flex-col">
        <img src="/assets/images/logo1.png" alt="logo" />

        <h2 className="h3-bold md:h2-bold pt-5 sm:pt-12">
          Log in to your account
        </h2>

        <p className="text-light-3 small-medium md:base-regular mt-2">
          Welcome back please enter your details to log in
        </p>

    <form 
      onSubmit={form.handleSubmit(onSubmit)} 
      className="flex flex-col gap-5 w-full mt-4">
      

      <FormField
        control={form.control}
        name="email"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Email</FormLabel>
            <FormControl>
              <Input type="email" className="shad-input" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

<FormField
        control={form.control}
        name="password"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Password</FormLabel>
            <FormControl>
              <Input type="password" className="shad-input" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <Button type="submit" className="shad-button_primary">
        {isUserLoading ?(
          <div className="flex-center gap-2">
            <Loader/>Signing in...
          </div>
        ) : "Sign in"}
      </Button>

      <p className="text-small-regular text-light-2 text-center mt-2">
        Don't have an account? {" "}
        <Link to="/sign-up" className="text-primary-500" text-small-semibold ml-1>
           Sign Up
        </Link>
      </p>

    </form>
    </div>
  </Form>
  )
}

export default SigninForm