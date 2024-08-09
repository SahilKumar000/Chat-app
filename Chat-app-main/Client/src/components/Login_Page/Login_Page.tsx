import { useState, ChangeEvent, FormEvent } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";


export default function CardWithForm() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) =>
    setName(e.target.value);
  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) =>
    setPassword(e.target.value);
  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) =>
    setEmail(e.target.value);

  const navigate = useNavigate();

  const handleSubmitSignin = async (e: any) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });
      const data = await response.json();
      if (response.ok) console.log("Signed in Successfully");
      else console.error("Signin failed:", data.error);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleSubmitLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, password }),
      });
      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("token", JSON.stringify(data.token)); 
        navigate("/");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const [isSigned, setSigned] = useState(true);
  const [isLogged, setLogged] = useState(false);

  const handleLogin = () => {
    setLogged(true);
    setSigned(false);
  };

  const handleSignin = () => {
    setLogged(false);
    setSigned(true);
  };

  return (
    <>
      {/* For Buttons  */}
      <div className="flex justify-center items-center mt-20 gap-x-10">
        <Button type="submit" onClick={handleLogin}>
          Login
        </Button>
        <Button type="submit" onClick={handleSignin}>
          SignUp
        </Button>
      </div>
      {/* For Login */}
      {isLogged && (
        <div className="flex justify-center items-center mt-20">
          <Card className="w-[350px]">
            <CardHeader>
              <CardTitle>Log in</CardTitle>
              <CardDescription>
                Enter your credentials to access your account.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmitLogin}>
                <div className="grid w-full items-center gap-4">
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      placeholder="Ice Spice"
                      value={name}
                      onChange={handleNameChange}
                    />
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="pass">Password</Label>
                    <Input
                      id="pass"
                      type="password"
                      placeholder="xyz"
                      value={password}
                      onChange={handlePasswordChange}
                    />
                  </div>
                  <CardFooter className="flex justify-center">
                    <Button type="submit">Submit</Button>
                  </CardFooter>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      )}
      {/* For Sign in */}
      {isSigned && (
        <div className="flex justify-center items-center mt-20">
          <Card className="w-[350px]">
            <CardHeader>
              <CardTitle>Sign Up</CardTitle>
              <CardDescription>
                Enter your credentials to create an account.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmitSignin}>
                <div className="grid w-full items-center gap-4">
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      placeholder="Ice Spice"
                      value={name}
                      onChange={handleNameChange}
                    />
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      placeholder="abc@mail.com"
                      value={email}
                      onChange={handleEmailChange}
                    />
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="pass">Password</Label>
                    <Input
                      id="pass"
                      type="password"
                      placeholder="xyz"
                      value={password}
                      onChange={handlePasswordChange}
                    />
                  </div>
                  <CardFooter className="flex justify-center">
                    <Button type="submit">Submit</Button>
                  </CardFooter>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  );
}

