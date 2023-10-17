import { useState } from "react";
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
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "./components/ui/dialog";
import { ScrollArea } from "./components/ui/scroll-area";

function App() {
  const [profile, updateProfile] = useState<number>(0);
  const [showRules, updateShowRules] = useState<boolean>(true);

  const nextProfile = () => {
    updateProfile((prev) => prev + 1);
  };

  const hideRules = () => {
    updateShowRules(false);
  };

  return (
    <>
      <div className="grid min-h-screen place-items-center align-middle">
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
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Recusandae ad veritatis quas tenetur velit alias dolore
              praesentium, asperiores animi at perspiciatis esse officiis
              accusantium aperiam cumque, blanditiis nemo quia ducimus.
            </CardContent>
            <CardFooter>
              <Button onClick={hideRules} className="w-full bg-orange-300">
                I understand
              </Button>
            </CardFooter>
          </Card>
        </div>
        <Progress value={(profile / 10) * 100} className="absolute top-0 z-0" />
        <Card className="w-11/12 sm:w-10/12 md:w-7/12 lg:w-5/12">
          <CardContent className="px-0 text-start">
            <div className="rounded-md">
              <img
                src="https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80"
                alt="profile picture"
                className="h-auto rounded-t-md"
              />
            </div>
            <div className="flex flex-col gap-3 px-5 md:px-10">
              <h3 className="pt-5 text-3xl">Profile Name</h3>
              <p>
                {" "}
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quae
                labore saepe magni voluptatibus rerum qui ullam, cumque,
                mollitia, praesentium nihil in iste soluta aut consequuntur
                optio distinctio nulla beatae tempore?{" "}
              </p>
              <Dialog>
                <DialogTrigger className="w-full">
                  <Button className="flex w-full gap-3">
                    More info <Info />
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader className="grid grid-cols-2">
                    <span className="text-2xl">Profile Name Bio</span>
                  </DialogHeader>
                  <ScrollArea className="h-[500px] w-full px-2">
                    Orci varius natoque penatibus et magnis dis parturient
                    montes, nascetur ridiculus mus. Curabitur sem sapien,
                    ultrices sit amet sem sit amet, ullamcorper faucibus massa.
                    Duis at viverra nisi. Phasellus volutpat, mi non elementum
                    elementum, nulla metus volutpat mauris, ultrices ultricies
                    ante mi euismod magna. Donec eget sodales tortor. Nulla quis
                    tempus libero. Praesent at risus sapien. Donec porta, metus
                    eget condimentum posuere, augue eros ultricies tellus, at
                    sagittis lacus ipsum ac orci. Duis dui felis, sagittis
                    fermentum consectetur ac, lacinia ut ipsum. Etiam
                    pellentesque libero at dapibus laoreet. Vivamus arcu lorem,
                    sagittis ac pulvinar quis, hendrerit quis elit. Donec in
                    nibh eu sapien posuere faucibus ac sit amet arcu. Vestibulum
                    mauris metus, facilisis suscipit neque eu, commodo aliquet
                    risus. Sed sit amet posuere nulla, eu rhoncus libero.
                    Vivamus dapibus, libero sit amet vulputate ornare, quam orci
                    mollis urna, eget tincidunt massa nunc nec dolor. Etiam in
                    posuere odio. Aliquam fermentum nibh ut tempus porta. Morbi
                    et diam ex. In ullamcorper placerat lorem in auctor. Aliquam
                    hendrerit rhoncus gravida. Aliquam mattis sit amet purus
                    ultricies sagittis. Praesent eleifend pulvinar elementum.
                    Vestibulum varius euismod elit non ullamcorper. Suspendisse
                    massa massa, imperdiet id massa vel, venenatis lobortis
                    neque. Praesent sapien orci, vestibulum at nisi vitae,
                    aliquet posuere lorem. Duis faucibus metus lobortis erat
                    lobortis, a mattis urna interdum. Fusce at laoreet magna.
                    Sed aliquam porttitor lorem, id aliquam metus consequat
                    eleifend. Aliquam condimentum justo in sodales fermentum.
                    Morbi libero turpis, consectetur quis mauris eget, porttitor
                    bibendum est. Mauris eget sapien vulputate, suscipit mauris
                    in, tincidunt augue. Phasellus quis enim ut turpis tempus
                    aliquam. Maecenas semper orci id lorem sollicitudin, vitae
                    lobortis justo laoreet. Mauris sed rutrum purus. Proin
                    fermentum ipsum mi. Phasellus arcu purus, egestas vitae
                    dolor eu, auctor maximus velit.
                  </ScrollArea>
                </DialogContent>
              </Dialog>
              <div className="flex gap-3">
                <Button
                  className="flex w-full gap-3 bg-red-500 hover:bg-red-600"
                  onClick={() => nextProfile()}
                >
                  Reject <X />
                </Button>
                <Button
                  className="flex w-full gap-3 bg-green-500 hover:bg-green-600"
                  onClick={() => nextProfile()}
                >
                  Match <Check />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}

export default App;
