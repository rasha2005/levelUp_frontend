import Otp from "./Otp";

export default function Layout({ children }:any) {
    return (
      <div>
        <Otp/>
        <main>{children}</main>
      </div>
    );
  };