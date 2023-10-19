import { useEffect, useState } from "react";
import "./App.css";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "./components/ui/card";
import { Button } from "./components/ui/button";
import { Check, X, Info } from "lucide-react";
import { Progress } from "./components/ui/progress";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "./components/ui/dialog";
import { ScrollArea } from "./components/ui/scroll-area";
import * as Profiles from "@/assets/profiles.json";
import { supabaseClient } from "@/lib/supabase";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./components/ui/form";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "./components/ui/input";
import { RadioGroup, RadioGroupItem } from "./components/ui/radio-group";

const formSchema = z.object({
  gender: z.string(),
  age: z.coerce.number(),
});

function App() {
  const [profileNum, updateProfileNum] = useState<number>(0);
  const [showRules, updateShowRules] = useState<boolean>(true);
  const [profile] = useState(Profiles.profiles);
  const [score, updateScore] = useState(0);
  const [showScore, updateShowScore] = useState(false);
  const [showForm, updateShowForm] = useState(false);
  const [showQuiz, updateShowQuiz] = useState(true);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });
  const nextProfile = () => {
    if (profileNum !== profile.length - 1) {
      updateProfileNum((prev) => prev + 1);
    } else {
      updateShowQuiz(false);
    }
  };

  const hideRules = () => {
    updateShowRules(false);
  };

  const decide = async (
    character: string,
    match: boolean,
    category: "Good" | "Bad",
  ) => {
    await supabaseClient.from("responses").insert({
      character,
      category,
      match,
    });
  };

  const scoreCard = () => (
    <Card className="w-64 space-y-5 p-10">
      <CardHeader>Thank you for participating!</CardHeader>
      <CardContent>You got: {(score / profile.length) * 100}%</CardContent>
    </Card>
  );

  useEffect(() => {
    if (profileNum === profile.length - 1) {
      updateShowForm(true);
    }
    console.log(profileNum);
  }, [profileNum]);

  const submit = async (values: z.infer<typeof formSchema>) => {
    await supabaseClient.from("respondants").insert({
      age: values.age,
      gender: values.gender,
      score: score,
    });
    updateShowForm(false);
    updateShowScore(true);
  };

  const RespondantForm = () => (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(submit)}
        className="w-64 space-y-5 rounded-md border px-10 py-10"
      >
        <h5>A quick form to fill out</h5>
        <FormField
          control={form.control}
          name="age"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Age</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="gender"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Gender</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-col space-y-1"
                >
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="M" />
                    </FormControl>
                    <FormLabel className="font-normal">Male</FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="F" />
                    </FormControl>
                    <FormLabel className="font-normal">Female</FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
            </FormItem>
          )}
        />
        <Button className="w-full">Submit</Button>
      </form>
    </Form>
  );

  return (
    <>
      <div
        className="grid min-h-screen place-items-center align-middle"
        style={{ display: showQuiz ? "" : "none" }}
      >
        <div
          className="absolute z-10 h-screen w-screen bg-[rgba(0,0,0,0.2)] saturate-150 backdrop-blur-xl"
          style={{ display: showRules ? "block" : "none" }}
        ></div>
        <div
          className="absolute left-1/2 top-1/2 z-20 grid w-screen -translate-x-1/2 -translate-y-1/2 place-items-center"
          style={{ display: showRules ? "grid" : "none" }}
        >
          <Card className="w-10/12 shadow-xl sm:w-8/12 md:w-3/5">
            <CardHeader>
              <span className="text-4xl">Rules</span>
            </CardHeader>
            <CardContent>
              The goal is to judge each profile and see if the person is someone
              you would feel safe going on a date with. If you do click on the{" "}
              <span className="text-green-500">Match</span> button, if not click
              on <span className="text-red-500">Reject</span>.
            </CardContent>
            <CardFooter>
              <Button onClick={hideRules} className="w-full bg-orange-300">
                I understand
              </Button>
            </CardFooter>
          </Card>
        </div>
        <Progress
          value={(profileNum / (profile.length - 1)) * 100}
          className="absolute top-0 z-0"
        />
        <Card className="w-11/12 sm:w-10/12 md:w-7/12 lg:w-5/12">
          <CardContent className="px-0 text-start">
            <div className="rounded-md">
              <img
                src={profile[profileNum].dp}
                alt="profile picture"
                className="h-auto rounded-t-md"
              />
            </div>
            <div className="flex flex-col gap-3 px-5 md:px-10">
              <h3 className="pt-5 text-3xl"> {profile[profileNum].name} </h3>
              <p>{profile[profileNum].bio.substring(0, 100)}...</p>
              <Dialog>
                <DialogTrigger className="w-full">
                  <Button className="flex w-full gap-3">
                    More info <Info />
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader className="grid grid-cols-2">
                    <span className="text-2xl">
                      {profile[profileNum].name}'s Bio
                    </span>
                  </DialogHeader>
                  <ScrollArea className="h-[500px] w-full px-2">
                    {profile[profileNum].bio}
                  </ScrollArea>
                  <DialogClose>
                    <Button className="w-full">Close</Button>
                  </DialogClose>
                </DialogContent>
              </Dialog>
              <div className="flex gap-3">
                <Button
                  className="flex w-full gap-3 bg-red-500 hover:bg-red-600"
                  onClick={() => {
                    decide(
                      profile[profileNum].name,
                      false,
                      profile[profileNum].category as "Good" | "Bad",
                    );
                    nextProfile();
                    if (profile[profileNum].category === "Bad") {
                      updateScore((prev) => prev + 1);
                    }
                  }}
                >
                  Reject <X />
                </Button>
                <Button
                  className="flex w-full gap-3 bg-green-500 hover:bg-green-600"
                  onClick={() => {
                    decide(
                      profile[profileNum].name,
                      true,
                      profile[profileNum].category as "Good" | "Bad",
                    );
                    nextProfile();
                    if (profile[profileNum].category === "Good") {
                      updateScore((prev) => prev + 1);
                    }
                  }}
                >
                  Match <Check />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      <div
        style={{ display: showForm ? "" : "none" }}
        className="grid min-h-screen min-w-full place-items-center align-middle"
      >
        {RespondantForm()}
      </div>
      <div
        style={{ display: showScore ? "" : "none" }}
        className="grid min-h-screen min-w-full place-items-center align-middle"
      >
        {scoreCard()}
      </div>
    </>
  );
}

export default App;
